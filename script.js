document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const urlInput = document.getElementById('url');
  const altInput = document.getElementById('alt');
  const gallery = document.getElementById('gallery');

  let images = JSON.parse(localStorage.getItem('images') || '[]');

  function save() {
    localStorage.setItem('images', JSON.stringify(images));
  }

  function render() {
    gallery.innerHTML = '';
    images.slice().reverse().forEach((img, index) => {
      const div = document.createElement('div');
      const span=document.createElement('span');
      div.className = 'image-item';
      span.className = 'image-item';
      const image = document.createElement('img');
      image.src = img.url;
      image.alt = img.alt || '';
      span.textContent = img.alt || '';
      div.appendChild(image);
      div.appendChild(span);
      
      const controls = document.createElement('div');
      controls.className = 'controls';

      const del = document.createElement('button');
      del.textContent = 'Delete';
      del.onclick = () => {
        images.splice(images.indexOf(img), 1);
        save();
        render();
      };
      controls.appendChild(del);

      const edit = document.createElement('button');
      edit.textContent = 'Edit';
      edit.className = 'edit';
      edit.onclick = () => {
        const newUrl = prompt('Edit image URL:', img.url);
        if (newUrl) {
          const newAlt = prompt('Edit alt text:', img.alt);
          img.url = newUrl;
          img.alt = newAlt !== null ? newAlt : img.alt;
          save();
          render();
        }
      };
      controls.appendChild(edit);

      div.appendChild(controls);
      gallery.appendChild(div);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    images.push({ url: urlInput.value, alt: altInput.value });
    save();
    render();
    urlInput.value = '';
    altInput.value = '';
  });

  render();
});
