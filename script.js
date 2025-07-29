document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const urlInput = document.getElementById('url');
  const altInput = document.getElementById('alt');
  const gallery = document.getElementById('gallery');

  const editDialog = document.getElementById('editDialog');
  const editForm = document.getElementById('editForm');
  const editUrl = document.getElementById('editUrl');
  const editAlt = document.getElementById('editAlt');

  let images = JSON.parse(localStorage.getItem('images') || '[]');
  let editingIndex = null;

  const save = () => localStorage.setItem('images', JSON.stringify(images));

  const render = () => {
    gallery.innerHTML = '';
    images.slice().reverse().forEach((img, idxRev) => {
      // idxRev: index in reversed order
      const originalIndex = images.length - 1 - idxRev;
      const div = document.createElement('div');
      const span=document.createElement('span');
      div.className = 'image-item';
      span.className = 'image-item';
      const imageEl = document.createElement('img');
      imageEl.src = img.url;
      imageEl.alt = img.alt || '';
      span.textContent = img.alt || '';
      div.appendChild(imageEl);
      div.appendChild(span);

      const controls = document.createElement('div');
      controls.className = 'controls';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        images.splice(originalIndex, 1);
        save();
        render();
      };
      controls.appendChild(deleteBtn);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => openEditDialog(originalIndex);
      controls.appendChild(editBtn);

      div.appendChild(controls);
      gallery.appendChild(div);
    });
  };

  const openEditDialog = (index) => {
    editingIndex = index;
    const img = images[index];
    editUrl.value = img.url;
    editAlt.value = img.alt || '';
    editDialog.showModal();
  };

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editingIndex != null) {
      images[editingIndex] = {
        url: editUrl.value,
        alt: editAlt.value
      };
      save();
      render();
      editingIndex = null;
    }
    editDialog.close();
  });

  editForm.addEventListener('cancel', () => {
    editingIndex = null;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    images.push({ url: urlInput.value, alt: altInput.value });
    save();
    render();
    urlInput.value = '';
    altInput.value = '';
  });

  render();
});
