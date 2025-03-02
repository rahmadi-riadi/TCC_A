document.addEventListener("DOMContentLoaded", () => {
  const formNotes = document.getElementById("form-notes");
  const judulInput = document.getElementById("judul");
  const isiInput = document.getElementById("isi");
  const tabelBody = document.getElementById("tabel-body");
  const btnSimpan = document.getElementById("btn-simpan");
  const btnBatal = document.getElementById("btn-batal");

  let isEditMode = false;
  let currentNoteId = null;

  // Fungsi untuk mengambil data catatan dari back-end
  const fetchNotes = async () => {
    const response = await fetch("http://localhost:3000/api/notes");
    const notes = await response.json();
    tabelBody.innerHTML = notes
      .map(
        (note) => `
            <tr>
                <td>${note.id}</td>
                <td>${note.title}</td>
                <td>${note.content}</td>
                <td class="table-actions">
                    <button onclick="editNote(${note.id})" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteNote(${note.id})" class="btn btn-danger btn-sm">Hapus</button>
                </td>
            </tr>
        `
      )
      .join("");
  };

  // Fungsi untuk menambah atau mengupdate catatan
  formNotes.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = judulInput.value;
    const content = isiInput.value;

    if (isEditMode) {
      // Update catatan
      await fetch(`http://localhost:3000/api/notes/${currentNoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      // Tambah catatan baru
      await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    // Reset form dan refresh data
    resetForm();
    fetchNotes();
  });

  // Fungsi untuk mengedit catatan
  window.editNote = async (id) => {
    const response = await fetch(`http://localhost:3000/api/notes/${id}`);
    const note = await response.json();
    judulInput.value = note.title;
    isiInput.value = note.content;
    isEditMode = true;
    currentNoteId = id;
    btnSimpan.textContent = "Update";
    btnBatal.style.display = "inline-block";
  };

  // Fungsi untuk menghapus catatan
  window.deleteNote = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });
      fetchNotes();
    }
  };

  // Fungsi untuk membatalkan edit
  btnBatal.addEventListener("click", () => {
    resetForm();
  });

  // Fungsi untuk mereset form
  const resetForm = () => {
    judulInput.value = "";
    isiInput.value = "";
    isEditMode = false;
    currentNoteId = null;
    btnSimpan.textContent = "Simpan";
    btnBatal.style.display = "none";
  };

  // Ambil data catatan saat halaman dimuat
  fetchNotes();
});
