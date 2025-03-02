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
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      if (!response.ok) {
        throw new Error("Gagal mengambil data catatan");
      }
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk menambah atau mengupdate catatan
  formNotes.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = judulInput.value.trim();
    const content = isiInput.value.trim();

    if (!title || !content) {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    try {
      if (isEditMode) {
        // Update catatan
        const response = await fetch(
          `http://localhost:3000/api/notes/${currentNoteId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
          }
        );
        if (!response.ok) {
          throw new Error("Gagal mengupdate catatan");
        }
      } else {
        // Tambah catatan baru
        const response = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        if (!response.ok) {
          throw new Error("Gagal menambah catatan");
        }
      }

      // Reset form dan refresh data
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  });

  // Fungsi untuk mengedit catatan
  window.editNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data catatan");
      }
      const note = await response.json();
      judulInput.value = note.title;
      isiInput.value = note.content;
      isEditMode = true;
      currentNoteId = id;
      btnSimpan.textContent = "Update";
      btnBatal.style.display = "inline-block";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk menghapus catatan
  window.deleteNote = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Gagal menghapus catatan");
        }
        fetchNotes();
      } catch (error) {
        console.error("Error:", error);
      }
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
