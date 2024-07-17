let nextBtns = document.querySelectorAll("form .button-loca .next-btn");  
let prevBtns = document.querySelectorAll("form .button-loca .previous-btn");
const form = document.querySelector("form"); 
const teamCount = document.querySelector("form #team-count"); 

teamCount.addEventListener("input", () => { 
  if (parseInt(teamCount.value) < 1 || teamCount.value == "") {
    const steps = Array.from(document.querySelectorAll("form .step"));
    for (let i = 1; i < steps.length; i++) {
      steps[i].remove();
    }
  }
  generateFields()
  nextBtns = document.querySelectorAll("form .button-loca .next-btn"); 
  prevBtns = document.querySelectorAll("form .button-loca .previous-btn"); 
  nextBtns.forEach((button) => {  
    button.addEventListener("click", (e) => {
     e.preventDefault();  
     changeStep("next");  
    });  
   });
   prevBtns.forEach((button) => {  
    button.addEventListener("click", (e) => {
     e.preventDefault();  
     changeStep("prev");  
    });  
   });
 }); 

form.addEventListener("submit", (e) => {  
  e.preventDefault();  
  const submitButton = document.querySelector(".submit-btn");
  const teamCount = document.getElementById('team-count').value;
  submitButton.disabled = true
  const inputs = [];  
  form.querySelectorAll("input").forEach((input) => {
    if (input.type === "radio" && !input.checked) {
      return; // Skip unchecked radio inputs
    };
    const { name, value } = input;  
    inputs.push({ name, value });  
  });  
  const formData = new FormData(form);
  // for (const data of formData.entries()) {
  //   console.log('this is formData', data);
  // }

  let counter = 0;
  for (let i = 1; i <= teamCount; i++) {
    const formDataForSheet = new FormData();
    const employeeName = formData.get(`employee-name-${i}`);
    const projectName = formData.get('project-name');
    const picName = formData.get('pic-name');
    const startDate = formData.get('start-date');
    const teamCount = formData.get('team-count');
    const unitName = formData.get(`unit-name-${i}`);
    const jobdesc = formData.get(`jobdesc-${i}`);
    const ketepatanWaktu = formData.get(`ketepatan-waktu-${i}`);
    const ketKetepatanWaktu = formData.get(`ket-ketepatan-waktu-${i}`);
    const komunikasiInternal = formData.get(`komunikasi-internal-${i}`);
    const ketKomunikasiInternal = formData.get(`ket-komunikasi-internal-${i}`);
    const kerjasamaTim = formData.get(`kerjasama-tim-${i}`);
    const ketKerjasamaTim = formData.get(`ket-kerjasama-tim-${i}`);
    const inisiatif = formData.get(`inisiatif-${i}`);
    const ketInisiatif = formData.get(`ket-inisiatif-${i}`);
    const kreativitas = formData.get(`kreativitas-${i}`);
    const ketKreativitas = formData.get(`ket-kreativitas-${i}`);
    const manajemenKonflik = formData.get(`manajemen-konflik-${i}`);
    const ketManKonflik = formData.get(`ket-man-konflik-${i}`);
    const pelayananPelanggan = formData.get(`pelayanan-pelanggan-${i}`);
    const ketPelayananPelanggan = formData.get(`ket-pelayanan-pelanggan-${i}`);
  
    formDataForSheet.append('employee-name', employeeName);
    formDataForSheet.append('project-name', projectName);
    formDataForSheet.append('pic-name', picName);
    formDataForSheet.append('start-date', startDate);
    formDataForSheet.append('team-count', teamCount);
    formDataForSheet.append('unit-name', unitName);
    formDataForSheet.append('jobdesc', jobdesc);
    formDataForSheet.append('ketepatan-waktu', ketepatanWaktu);
    formDataForSheet.append('ket-ketepatan-waktu', ketKetepatanWaktu);
    formDataForSheet.append('komunikasi-internal', komunikasiInternal);
    formDataForSheet.append('ket-komunikasi-internal', ketKomunikasiInternal);
    formDataForSheet.append('kerjasama-tim', kerjasamaTim);
    formDataForSheet.append('ket-kerjasama-tim', ketKerjasamaTim);
    formDataForSheet.append('inisiatif', inisiatif);
    formDataForSheet.append('ket-inisiatif', ketInisiatif);
    formDataForSheet.append('kreativitas', kreativitas);
    formDataForSheet.append('ket-kreativitas', ketKreativitas);
    formDataForSheet.append('manajemen-konflik', manajemenKonflik);
    formDataForSheet.append('ket-man-konflik', ketManKonflik);
    formDataForSheet.append('pelayanan-pelanggan', pelayananPelanggan);
    formDataForSheet.append('ket-pelayanan-pelanggan', ketPelayananPelanggan);
  
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzgA7RjxsC_6_VbywyedD0YW_vLlFi8MTvtZk5ighunv8xd1Rc5ri5K3xt8ZNLDVY9kfw/exec';
    fetch(scriptURL, { method: 'POST', body: formDataForSheet })
      .then(response => {
        console.log('Success send data to googlesheet', response);
        counter++;
        if (counter === teamCount) {
          alert('Success send data to googlesheet.', response);
          submitButton.disabled = false
          form.reset();
          window.location.href = 'dashboard_supervisor.html'
        }
      })
      .catch(error => {
        console.error('Error!', error.message)
        alert('Error send data to googlesheet!')
        submitButton.disabled = false
      });
  }
});

function changeStep(btn) {
  const steps = Array.from(document.querySelectorAll("form .step"));  
  let index = 0;  
  const active = document.querySelector(".active");  
  index = steps.indexOf(active);  
  steps[index].classList.remove("active");  
  if (btn === "next") {  
    index++;  
  } else if (btn === "prev") {  
    index--;  
  }
  steps[index].classList.add("active");
  window.scrollTo(0, 0);
}

function generateFields() {
  let teamCount = document.getElementById('team-count').value;
  let container = document.querySelector('.dynamicFieldsContainer');

  for (let i = 1; i <= teamCount; i++) {
    // div 'Step'
    let stepDiv = document.createElement("div");
    stepDiv.classList.add("step", `step-${i+1}`);

    // div 'Nama Anggota Tim'
    let nameDiv = document.createElement("div");
    let nameLabel = document.createElement('label');
    let nameInput = document.createElement('select');
    nameDiv.classList.add("form-control");
    nameLabel.innerHTML = 'Nama Anggota Tim ' + (i);
    nameInput.id = `employee-name-${i}`;
    nameInput.name = `employee-name-${i}`;
    let nameOptions = [
      "Acariya Christian",
      "Aditya Mahendra",
      "Dedy Aprianto",
      "Dino",
      "Faustina Marietta Loenardi", 
      "Hony Seplaretia Stanny",
      "Lucas Xander Paul Anakotta",
      "Mikhael Edward Thomas",
      "Muhammad Nasrul Khabibi",
      "Mochammad Samsul Hadi",
      "Ratna Koes Afandi"
    ];
    nameOptions.forEach(function(nameOption) {
        let optionElement = document.createElement("option");
        optionElement.setAttribute("value", nameOption);
        optionElement.textContent = nameOption;
        nameInput.appendChild(optionElement);
    });
    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(nameDiv);
    container.appendChild(stepDiv);

    // div 'Unit Kerja'
    let unitDiv = document.createElement("div");
    let unitLabel = document.createElement('label');
    let unitInput = document.createElement('input');
    unitDiv.classList.add("form-control");
    unitLabel.innerHTML = 'Unit Kerja';
    unitInput.type = 'text';
    unitInput.id = `unit-name-${i}`;
    unitInput.name = `unit-name-${i}`;
    unitInput.placeholder = 'Unit Kerja';
    unitDiv.appendChild(unitLabel);
    unitDiv.appendChild(unitInput);
    unitDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(unitDiv);
    container.appendChild(stepDiv);

    // div 'Jobdesk Saat Project'
    let jobDiv = document.createElement("div");
    let jobLabel = document.createElement('label');
    let jobInput = document.createElement('input');
    jobDiv.classList.add("form-control");
    jobLabel.innerHTML = 'Jobdesk Saat Project';
    jobInput.type = 'text';
    jobInput.id = `jobdesc-${i}`;
    jobInput.name = `jobdesc-${i}`;
    jobInput.placeholder = 'Jobdesk Saat Project';
    jobDiv.appendChild(jobLabel);
    jobDiv.appendChild(jobInput);
    jobDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(jobDiv);
    container.appendChild(stepDiv);

    // div 'Ketepatan Waktu'
    let ketepatanDiv = document.createElement("div");
    ketepatanDiv.classList.add("form-control");
    let ketepatanLabel = document.createElement('label');
    ketepatanLabel.innerHTML = 
    'Ketepatan Waktu<br>1: Sering terlambat dalam memenuhi tenggat waktu.<br>2: Kadang-kadang terlambat dalam menyelesaikan tugas.<br>3: Pemenuhan tenggat waktu yang cukup konsisten.<br>4: Selalu tepat waktu dalam menyelesaikan tugas.<br>5: Mengungguli harapan, selalu lebih cepat dari tenggat waktu.<br>';

    let ketepatanTable = document.createElement('table');
    let headerRow = document.createElement('tr');
    headerRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let thEmpty = document.createElement('th');
    thEmpty.id = 'empty';
    headerRow.appendChild(thEmpty);

    let tdPoor = document.createElement('td');
    tdPoor.id = 'poor';
    tdPoor.textContent = '1';
    headerRow.appendChild(tdPoor);

    let tdFair = document.createElement('td');
    tdFair.id = 'fair';
    tdFair.textContent = '2';
    headerRow.appendChild(tdFair);

    let tdAverage = document.createElement('td');
    tdAverage.id = 'average';
    tdAverage.textContent = '3';
    headerRow.appendChild(tdAverage);

    let tdVeryGood = document.createElement('td');
    tdVeryGood.id = 'very good';
    tdVeryGood.textContent = '4';
    headerRow.appendChild(tdVeryGood);

    let tdExcellent = document.createElement('td');
    tdExcellent.id = 'excellent';
    tdExcellent.textContent = '5';
    headerRow.appendChild(tdExcellent);
    ketepatanTable.appendChild(headerRow);

    let ketepatanRow = document.createElement('tr');
    let ketepatanThTitle = document.createElement('th');
    ketepatanThTitle.id = 'title';
    let ketepatanTableLabel = document.createElement('label');
    ketepatanTableLabel.textContent = 'Ketepatan Waktu';
    ketepatanThTitle.appendChild(ketepatanTableLabel);
    ketepatanRow.appendChild(ketepatanThTitle);

    let values = ['1', '2', '3', '4', '5'];
    values.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `ketepatan-waktu-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        ketepatanRow.appendChild(td);
    });

    ketepatanTable.appendChild(ketepatanRow);
    ketepatanDiv.appendChild(ketepatanLabel);
    ketepatanDiv.appendChild(ketepatanTable);
    stepDiv.appendChild(ketepatanDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Ketepatan Waktu'
    let ketKetepatanDiv = document.createElement("div");
    let ketKetepatanLabel = document.createElement('label');
    let ketKetepatanInput = document.createElement('input');
    ketKetepatanDiv.classList.add("form-control");
    ketKetepatanLabel.innerHTML = 'Keterangan Penilaian: Ketepatan Waktu';
    ketKetepatanInput.type = 'text';
    ketKetepatanInput.name = `ket-ketepatan-waktu-${i}`;
    ketKetepatanInput.placeholder = 'Berikan alasan untuk penilaian ketepatan waktu';
    ketKetepatanDiv.appendChild(ketKetepatanLabel);
    ketKetepatanDiv.appendChild(ketKetepatanInput);
    ketKetepatanDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketKetepatanDiv);
    container.appendChild(stepDiv);

    // div 'Komunikasi Internal'
    let komunikasiDiv = document.createElement("div");
    komunikasiDiv.classList.add("form-control");
    let komunikasiLabel = document.createElement('label');
    komunikasiLabel.innerHTML = 
    'Komunikasi Internal<br>1: Komunikasi internal seringkali tidak jelas atau kurang efektif.<br>2: Beberapa ketidakjelasan dalam komunikasi internal.<br>3: Komunikasi internal yang cukup jelas dan efektif.<br>4: Komunikasi internal sangat baik, minimal ketidakjelasan.<br>5: Komunikasi internal luar biasa, memastikan semua anggota panitia terinformasi dengan baik.<br>';

    let komunikasiTable = document.createElement('table');
    let komunikasiHeaderRow = document.createElement('tr');
    komunikasiHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let komunikasiThEmpty = document.createElement('th');
    komunikasiThEmpty.id = 'empty';
    komunikasiHeaderRow.appendChild(komunikasiThEmpty);

    let komunikasiTdPoor = document.createElement('td');
    komunikasiTdPoor.id = 'poor';
    komunikasiTdPoor.textContent = '1';
    komunikasiHeaderRow.appendChild(komunikasiTdPoor);

    let komunikasiTdFair = document.createElement('td');
    komunikasiTdFair.id = 'fair';
    komunikasiTdFair.textContent = '2';
    komunikasiHeaderRow.appendChild(komunikasiTdFair);

    let komunikasiTdAverage = document.createElement('td');
    komunikasiTdAverage.id = 'average';
    komunikasiTdAverage.textContent = '3';
    komunikasiHeaderRow.appendChild(komunikasiTdAverage);

    let komunikasiTdVeryGood = document.createElement('td');
    komunikasiTdVeryGood.id = 'very good';
    komunikasiTdVeryGood.textContent = '4';
    komunikasiHeaderRow.appendChild(komunikasiTdVeryGood);

    let komunikasiTdExcellent = document.createElement('td');
    komunikasiTdExcellent.id = 'excellent';
    komunikasiTdExcellent.textContent = '5';

    komunikasiHeaderRow.appendChild(komunikasiTdExcellent);
    komunikasiTable.appendChild(komunikasiHeaderRow);

    let komunikasiRow = document.createElement('tr');
    let komunikasiThTitle = document.createElement('th');
    komunikasiThTitle.id = 'title';
    let komunikasiTableLabel = document.createElement('label');
    komunikasiTableLabel.textContent = 'Komunikasi Internal';
    komunikasiThTitle.appendChild(komunikasiTableLabel);
    komunikasiRow.appendChild(komunikasiThTitle);

    let komunikasiValues = ['1', '2', '3', '4', '5'];
    komunikasiValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `komunikasi-internal-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        komunikasiRow.appendChild(td);
    });

    komunikasiTable.appendChild(komunikasiRow);
    komunikasiDiv.appendChild(komunikasiLabel);
    komunikasiDiv.appendChild(komunikasiTable);
    stepDiv.appendChild(komunikasiDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Komunikasi Internal'
    let ketKomunikasiDiv = document.createElement("div");
    let ketKomunikasiLabel = document.createElement('label');
    let ketKomunikasiInput = document.createElement('input');
    ketKomunikasiDiv.classList.add("form-control");
    ketKomunikasiLabel.innerHTML = 'Keterangan Penilaian: Komunikasi Internal';
    ketKomunikasiInput.type = 'text';
    ketKomunikasiInput.name = `ket-komunikasi-internal-${i}`;
    ketKomunikasiInput.placeholder = 'Berikan alasan untuk penilaian komunikasi internal';
    ketKomunikasiDiv.appendChild(ketKomunikasiLabel);
    ketKomunikasiDiv.appendChild(ketKomunikasiInput);
    ketKomunikasiDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketKomunikasiDiv);
    container.appendChild(stepDiv);
    
    // div 'Kerjasama Tim'
    let kerjasamaDiv = document.createElement("div");
    kerjasamaDiv.classList.add("form-control");
    let kerjasamaLabel = document.createElement('label');
    kerjasamaLabel.innerHTML = 
    'Kerjasama Tim<br>1: Tidak ada kerjasama, banyak konflik di antara anggota panitia.<br>2: Kerjasama terbatas, perlu ditingkatkan.<br>3: Kerjasama cukup, tetapi masih ada beberapa ketidakcocokan.<br>4: Kerjasama baik, anggota panitia mendukung satu sama lain.<br>5: Kerjasama sangat baik, panitia bekerja bersama harmonis.<br>';

    let kerjasamaTable = document.createElement('table');
    let kerjasamaHeaderRow = document.createElement('tr');
    kerjasamaHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let kerjasamaThEmpty = document.createElement('th');
    kerjasamaThEmpty.id = 'empty';
    kerjasamaHeaderRow.appendChild(kerjasamaThEmpty);

    let kerjasamaTdPoor = document.createElement('td');
    kerjasamaTdPoor.id = 'poor';
    kerjasamaTdPoor.textContent = '1';
    kerjasamaHeaderRow.appendChild(kerjasamaTdPoor);

    let kerjasamaTdFair = document.createElement('td');
    kerjasamaTdFair.id = 'fair';
    kerjasamaTdFair.textContent = '2';
    kerjasamaHeaderRow.appendChild(kerjasamaTdFair);

    let kerjasamaTdAverage = document.createElement('td');
    kerjasamaTdAverage.id = 'average';
    kerjasamaTdAverage.textContent = '3';
    kerjasamaHeaderRow.appendChild(kerjasamaTdAverage);

    let kerjasamaTdVeryGood = document.createElement('td');
    kerjasamaTdVeryGood.id = 'very good';
    kerjasamaTdVeryGood.textContent = '4';
    kerjasamaHeaderRow.appendChild(kerjasamaTdVeryGood);

    let kerjasamaTdExcellent = document.createElement('td');
    kerjasamaTdExcellent.id = 'excellent';
    kerjasamaTdExcellent.textContent = '5';
    kerjasamaHeaderRow.appendChild(kerjasamaTdExcellent);
    kerjasamaTable.appendChild(kerjasamaHeaderRow);

    let kerjasamaRow = document.createElement('tr');
    let kerjasamaThTitle = document.createElement('th');
    kerjasamaThTitle.id = 'title';
    let kerjasamaTableLabel = document.createElement('label');
    kerjasamaTableLabel.textContent = 'Kerjasama Tim';
    kerjasamaThTitle.appendChild(kerjasamaTableLabel);
    kerjasamaRow.appendChild(kerjasamaThTitle);

    let kerjasamaValues = ['1', '2', '3', '4', '5'];
    kerjasamaValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `kerjasama-tim-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        kerjasamaRow.appendChild(td);
    });

    kerjasamaTable.appendChild(kerjasamaRow);
    kerjasamaDiv.appendChild(kerjasamaLabel);
    kerjasamaDiv.appendChild(kerjasamaTable);
    stepDiv.appendChild(kerjasamaDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Kerjasama Tim'
    let ketKerjasamaDiv = document.createElement("div");
    let ketKerjasamaLabel = document.createElement('label');
    let ketKerjasamaInput = document.createElement('input');
    ketKerjasamaDiv.classList.add("form-control");
    ketKerjasamaLabel.innerHTML = 'Keterangan Penilaian: Kerjasama Tim';
    ketKerjasamaInput.type = 'text';
    ketKerjasamaInput.name = `ket-kerjasama-tim-${i}`;
    ketKerjasamaInput.placeholder = 'Berikan alasan untuk penilaian kerjasama tim';
    ketKerjasamaDiv.appendChild(ketKerjasamaLabel);
    ketKerjasamaDiv.appendChild(ketKerjasamaInput);
    ketKerjasamaDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketKerjasamaDiv);
    container.appendChild(stepDiv);

    // div 'Inisiatif'
    let inisiatifDiv = document.createElement("div");
    inisiatifDiv.classList.add("form-control");
    let inisiatifLabel = document.createElement('label');
    inisiatifLabel.innerHTML = 
    'Inisiatif<br>1: Kurangnya inisiatif dalam mengambil tindakan atau solusi.<br>2: Inisiatif terbatas, perlu ditingkatkan.<br>3: Memiliki inisiatif yang cukup untuk menyelesaikan tugas.<br>4: Memperlihatkan inisiatif yang baik, mampu melihat dan menyelesaikan masalah.<br>5: Inisiatif yang luar biasa, proaktif dalam mengatasi kendala.<br>';

    let inisiatifTable = document.createElement('table');
    let inisiatifHeaderRow = document.createElement('tr');
    inisiatifHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let inisiatifThEmpty = document.createElement('th');
    inisiatifThEmpty.id = 'empty';
    inisiatifHeaderRow.appendChild(inisiatifThEmpty);

    let inisiatifTdPoor = document.createElement('td');
    inisiatifTdPoor.id = 'poor';
    inisiatifTdPoor.textContent = '1';
    inisiatifHeaderRow.appendChild(inisiatifTdPoor);

    let inisiatifTdFair = document.createElement('td');
    inisiatifTdFair.id = 'fair';
    inisiatifTdFair.textContent = '2';
    inisiatifHeaderRow.appendChild(inisiatifTdFair);

    let inisiatifTdAverage = document.createElement('td');
    inisiatifTdAverage.id = 'average';
    inisiatifTdAverage.textContent = '3';
    inisiatifHeaderRow.appendChild(inisiatifTdAverage);

    let inisiatifTdVeryGood = document.createElement('td');
    inisiatifTdVeryGood.id = 'very good';
    inisiatifTdVeryGood.textContent = '4';
    inisiatifHeaderRow.appendChild(inisiatifTdVeryGood);

    let inisiatifTdExcellent = document.createElement('td');
    inisiatifTdExcellent.id = 'excellent';
    inisiatifTdExcellent.textContent = '5';
    inisiatifHeaderRow.appendChild(inisiatifTdExcellent);
    inisiatifTable.appendChild(inisiatifHeaderRow);

    let inisiatifRow = document.createElement('tr');
    let inisiatifThTitle = document.createElement('th');
    inisiatifThTitle.id = 'title';
    let inisiatifTableLabel = document.createElement('label');
    inisiatifTableLabel.textContent = 'Inisiatif Dalam Tindakan';
    inisiatifThTitle.appendChild(inisiatifTableLabel);
    inisiatifRow.appendChild(inisiatifThTitle);

    let inisiatifValues = ['1', '2', '3', '4', '5'];
    inisiatifValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `inisiatif-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        inisiatifRow.appendChild(td);
    });

    inisiatifTable.appendChild(inisiatifRow);
    inisiatifDiv.appendChild(inisiatifLabel);
    inisiatifDiv.appendChild(inisiatifTable);
    stepDiv.appendChild(inisiatifDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Inisiatif'
    let ketInisiatifDiv = document.createElement("div");
    let ketInisiatifLabel = document.createElement('label');
    let ketInisiatifInput = document.createElement('input');
    ketInisiatifDiv.classList.add("form-control");
    ketInisiatifLabel.innerHTML = 'Keterangan Penilaian: Inisiatif';
    ketInisiatifInput.type = 'text';
    ketInisiatifInput.name = `ket-inisiatif-${i}`;
    ketInisiatifInput.placeholder = 'Berikan alasan untuk penilaian inisiatif';
    ketInisiatifDiv.appendChild(ketInisiatifLabel);
    ketInisiatifDiv.appendChild(ketInisiatifInput);
    ketInisiatifDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketInisiatifDiv);
    container.appendChild(stepDiv);

    // div 'Kreativitas Dalam Pemecahan Masalah'
    let kreativitasDiv = document.createElement("div");
    kreativitasDiv.classList.add("form-control");
    let kreativitasLabel = document.createElement('label');
    kreativitasLabel.innerHTML = 
    'Kreativitas Dalam Pemecahan Masalah<br>1: Kurangnya kreativitas dalam mencari solusi masalah.<br>2: Kreativitas terbatas, perlu ditingkatkan.<br>3: Memiliki kreativitas yang cukup dalam menemukan solusi.<br>4: Kreativitas yang baik, menciptakan solusi yang efektif.<br>5: Kreativitas luar biasa, mampu menemukan solusi inovatif.<br>';

    let kreativitasTable = document.createElement('table');
    let kreativitasHeaderRow = document.createElement('tr');
    kreativitasHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let kreativitasThEmpty = document.createElement('th');
    kreativitasThEmpty.id = 'empty';
    kreativitasHeaderRow.appendChild(kreativitasThEmpty);

    let kreativitasTdPoor = document.createElement('td');
    kreativitasTdPoor.id = 'poor';
    kreativitasTdPoor.textContent = '1';
    kreativitasHeaderRow.appendChild(kreativitasTdPoor);

    let kreativitasTdFair = document.createElement('td');
    kreativitasTdFair.id = 'fair';
    kreativitasTdFair.textContent = '2';
    kreativitasHeaderRow.appendChild(kreativitasTdFair);

    let kreativitasTdAverage = document.createElement('td');
    kreativitasTdAverage.id = 'average';
    kreativitasTdAverage.textContent = '3';
    kreativitasHeaderRow.appendChild(kreativitasTdAverage);

    let kreativitasTdVeryGood = document.createElement('td');
    kreativitasTdVeryGood.id = 'very good';
    kreativitasTdVeryGood.textContent = '4';
    kreativitasHeaderRow.appendChild(kreativitasTdVeryGood);

    let kreativitasTdExcellent = document.createElement('td');
    kreativitasTdExcellent.id = 'excellent';
    kreativitasTdExcellent.textContent = '5';
    kreativitasHeaderRow.appendChild(kreativitasTdExcellent);
    kreativitasTable.appendChild(kreativitasHeaderRow);

    let kreativitasRow = document.createElement('tr');
    let kreativitasThTitle = document.createElement('th');
    kreativitasThTitle.id = 'title';
    let kreativitasTableLabel = document.createElement('label');
    kreativitasTableLabel.textContent = 'Kreativitas Pemecahan Masalah';
    kreativitasThTitle.appendChild(kreativitasTableLabel);
    kreativitasRow.appendChild(kreativitasThTitle);

    let kreativitasValues = ['1', '2', '3', '4', '5'];
    kreativitasValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `kreativitas-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        kreativitasRow.appendChild(td);
    });

    kreativitasTable.appendChild(kreativitasRow);
    kreativitasDiv.appendChild(kreativitasLabel);
    kreativitasDiv.appendChild(kreativitasTable);
    stepDiv.appendChild(kreativitasDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Kreativitas Dalam Pemecahan Masalah'
    let ketKreativitasDiv = document.createElement("div");
    let ketKreativitasLabel = document.createElement('label');
    let ketKreativitasInput = document.createElement('input');
    ketKreativitasDiv.classList.add("form-control");
    ketKreativitasLabel.innerHTML = 'Keterangan Penilaian: Kreativitas Dalam Pemecahan Masalah';
    ketKreativitasInput.type = 'text';
    ketKreativitasInput.name = `ket-kreativitas-${i}`;
    ketKreativitasInput.placeholder = 'Berikan alasan untuk penilaian kreativitas';
    ketKreativitasDiv.appendChild(ketKreativitasLabel);
    ketKreativitasDiv.appendChild(ketKreativitasInput);
    ketKreativitasDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketKreativitasDiv);
    container.appendChild(stepDiv);
    
    // div 'Manajemen Konflik'
    let konflikDiv = document.createElement("div");
    konflikDiv.classList.add("form-control");
    let konflikLabel = document.createElement('label');
    konflikLabel.innerHTML = 
    'Manajemen Konflik<br>1: Tidak dapat mengelola konflik, berdampak negatif pada kerjasama tim.<br>2: Kemampuan manajemen konflik perlu perbaikan.<br>3: Mampu mengelola konflik, tetapi masih ada pergeseran.<br>4: Manajemen konflik yang baik, dampaknya minim pada produktivitas.<br>5: Mampu menyelesaikan konflik dengan baik, memelihara harmoni.<br>';

    let konflikTable = document.createElement('table');
    let konflikHeaderRow = document.createElement('tr');
    konflikHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let konflikThEmpty = document.createElement('th');
    konflikThEmpty.id = 'empty';
    konflikHeaderRow.appendChild(konflikThEmpty);

    let konflikTdPoor = document.createElement('td');
    konflikTdPoor.id = 'poor';
    konflikTdPoor.textContent = '1';
    konflikHeaderRow.appendChild(konflikTdPoor);

    let konflikTdFair = document.createElement('td');
    konflikTdFair.id = 'fair';
    konflikTdFair.textContent = '2';
    konflikHeaderRow.appendChild(konflikTdFair);

    let konflikTdAverage = document.createElement('td');
    konflikTdAverage.id = 'average';
    konflikTdAverage.textContent = '3';
    konflikHeaderRow.appendChild(konflikTdAverage);

    let konflikTdVeryGood = document.createElement('td');
    konflikTdVeryGood.id = 'very good';
    konflikTdVeryGood.textContent = '4';
    konflikHeaderRow.appendChild(konflikTdVeryGood);

    let konflikTdExcellent = document.createElement('td');
    konflikTdExcellent.id = 'excellent';
    konflikTdExcellent.textContent = '5';
    konflikHeaderRow.appendChild(konflikTdExcellent);
    konflikTable.appendChild(konflikHeaderRow);

    let konflikRow = document.createElement('tr');
    let konflikThTitle = document.createElement('th');
    konflikThTitle.id = 'title';
    let konflikTableLabel = document.createElement('label');
    konflikTableLabel.textContent = 'Manajemen Konflik';
    konflikThTitle.appendChild(konflikTableLabel);
    konflikRow.appendChild(konflikThTitle);

    let konflikValues = ['1', '2', '3', '4', '5'];
    konflikValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `manajemen-konflik-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        konflikRow.appendChild(td);
    });

    konflikTable.appendChild(konflikRow);
    konflikDiv.appendChild(konflikLabel);
    konflikDiv.appendChild(konflikTable);
    stepDiv.appendChild(konflikDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Manajemen Konflik'
    let ketKonflikDiv = document.createElement("div");
    let ketKonflikLabel = document.createElement('label');
    let ketKonflikInput = document.createElement('input');
    ketKonflikDiv.classList.add("form-control");
    ketKonflikLabel.innerHTML = 'Keterangan Penilaian: Manajemen Konflik';
    ketKonflikInput.type = 'text';
    ketKonflikInput.name = `ket-man-konflik-${i}`
    ketKonflikInput.placeholder = 'Berikan alasan untuk penilaian manajemen konflik';
    ketKonflikDiv.appendChild(ketKonflikLabel);
    ketKonflikDiv.appendChild(ketKonflikInput);
    ketKonflikDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketKonflikDiv);
    container.appendChild(stepDiv);    

    // div 'Pelayanan Pelanggan'
    let pelayananDiv = document.createElement("div");
    pelayananDiv.classList.add("form-control");
    let pelayananLabel = document.createElement('label');
    pelayananLabel.innerHTML = 
    'Pelayanan Pelanggan<br>1: Pelayanan pelanggan sangat buruk, seringkali tidak responsif.<br>2: Pelayanan pelanggan kurang baik, perlu peningkatan responsivitas.<br>3: Pelayanan pelanggan cukup, namun masih ada ruang untuk perbaikan.<br>4: Pelayanan pelanggan baik, responsif terhadap kebutuhan peserta atau klien.<br>5: Pelayanan pelanggan sangat baik, selalu memprioritaskan kepuasan peserta atau klien.<br>';

    let pelayananTable = document.createElement('table');
    let pelayananHeaderRow = document.createElement('tr');
    pelayananHeaderRow.style.backgroundColor = 'rgb(255, 255, 255)';

    let pelayananThEmpty = document.createElement('th');
    pelayananThEmpty.id = 'empty';
    pelayananHeaderRow.appendChild(pelayananThEmpty);

    let pelayananTdPoor = document.createElement('td');
    pelayananTdPoor.id = 'poor';
    pelayananTdPoor.textContent = '1';
    pelayananHeaderRow.appendChild(pelayananTdPoor);

    let pelayananTdFair = document.createElement('td');
    pelayananTdFair.id = 'fair';
    pelayananTdFair.textContent = '2';
    pelayananHeaderRow.appendChild(pelayananTdFair);

    let pelayananTdAverage = document.createElement('td');
    pelayananTdAverage.id = 'average';
    pelayananTdAverage.textContent = '3';
    pelayananHeaderRow.appendChild(pelayananTdAverage);

    let pelayananTdVeryGood = document.createElement('td');
    pelayananTdVeryGood.id = 'very good';
    pelayananTdVeryGood.textContent = '4';
    pelayananHeaderRow.appendChild(pelayananTdVeryGood);

    let pelayananTdExcellent = document.createElement('td');
    pelayananTdExcellent.id = 'excellent';
    pelayananTdExcellent.textContent = '5';
    pelayananHeaderRow.appendChild(pelayananTdExcellent);
    pelayananTable.appendChild(pelayananHeaderRow);

    let pelayananRow = document.createElement('tr');
    let pelayananThTitle = document.createElement('th');
    pelayananThTitle.id = 'title';
    let pelayananTableLabel = document.createElement('label');
    pelayananTableLabel.textContent = 'Pelayanan Pelanggan';
    pelayananThTitle.appendChild(pelayananTableLabel);
    pelayananRow.appendChild(pelayananThTitle);

    let pelayananValues = ['1', '2', '3', '4', '5'];
    pelayananValues.forEach(function(value) {
        let td = document.createElement('td');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = `pelayanan-pelanggan-${i}`;
        input.value = value;
        input.setAttribute('ng-model', 'model[item]');
        label.appendChild(input);
        td.appendChild(label);
        pelayananRow.appendChild(td);
    });

    pelayananTable.appendChild(pelayananRow);
    pelayananDiv.appendChild(pelayananLabel);
    pelayananDiv.appendChild(pelayananTable);
    stepDiv.appendChild(pelayananDiv);
    container.appendChild(stepDiv);

    // div 'Keterangan Penilaian: Pelayanan Pelanggan'
    let ketPelayananDiv = document.createElement("div");
    let ketPelayananLabel = document.createElement('label');
    let ketPelayananInput = document.createElement('input');
    ketPelayananDiv.classList.add("form-control");
    ketPelayananLabel.innerHTML = 'Keterangan Penilaian: Pelayanan Pelanggan';
    ketPelayananInput.type = 'text';
    ketPelayananInput.name = `ket-pelayanan-pelanggan-${i}`
    ketPelayananInput.placeholder = 'Berikan alasan untuk penilaian pelayanan pelanggan';
    ketPelayananDiv.appendChild(ketPelayananLabel);
    ketPelayananDiv.appendChild(ketPelayananInput);
    ketPelayananDiv.appendChild(document.createElement('br'));
    stepDiv.appendChild(ketPelayananDiv);
    container.appendChild(stepDiv);

    // next & previous button
    if (i == teamCount) {
      let buttonDiv = document.createElement("div");
      buttonDiv.classList.add("button-loca");
  
      const previousBtn = document.createElement('button');
      previousBtn.className = 'previous-btn';
      previousBtn.style.backgroundColor = '#ffffff';
      previousBtn.innerHTML = '<p style="color:#1b1b1b">Back</p>';

      const submitBtn = document.createElement('button');
      submitBtn.className = 'submit-btn';
      submitBtn.type = 'submit';
      submitBtn.value = 'submit';
      submitBtn.innerHTML = '<p style="color:#f1f1f1">Submit</p>';
  
      buttonDiv.appendChild(previousBtn);
      buttonDiv.appendChild(submitBtn);
      stepDiv.appendChild(buttonDiv);
      container.appendChild(stepDiv);
    } else {
      let buttonDiv = document.createElement("div");
      buttonDiv.classList.add("button-loca");

      const previousBtn = document.createElement('button');
      previousBtn.className = 'previous-btn';
      previousBtn.style.backgroundColor = '#ffffff';
      previousBtn.innerHTML = '<p style="color:#1b1b1b">Back</p>';
  
      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-btn';
      nextBtn.innerHTML = '<p style="color:#f1f1f1">Next</p>';
  
      buttonDiv.appendChild(previousBtn);
      buttonDiv.appendChild(nextBtn);
      stepDiv.appendChild(buttonDiv);
      container.appendChild(stepDiv);
    }
  }
}
