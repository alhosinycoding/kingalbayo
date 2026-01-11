const users = [
  {
    username: "يحيى حسين",
    password: "Yehia@2026",
    name: "يحيى حسين",
    rank: 6,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "مروان حسن",
    password: "Marwan@2026",
    name: "مروان حسن",
    rank: 8,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "مروان طاهر",
    password: "Taher@2026",
    name: "مروان طاهر",
    rank: 3,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "سارة محمد",
    password: "Sara@2026",
    name: "سارة محمد",
    rank: 2,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "مستر محمد",
    password: "Admin@2026",
    name: "مستر محمد",
    rank: 0,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "رؤي السعدي",
    password: "Roya@2026",
    name: "رؤي السعدي",
    rank: 1,
    group: "الجمعة الساعة 3 العصر"
  },
  
  {
    username: "ملك وليد",
    password: "Malak@2026",
    name: "ملك وليد",
    rank: 5,
    group: "الاثنين"
  },
  {
    username: "عبدالله محمد",
    password: "Abdallah@2026",
    name: "عبدالله محمد",
    rank: 4,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "يحيى احمد",
    password: "YehiaA@2026",
    name: "يحيى احمد",
    rank: 9,
    group: "الجمعة الساعة 3 العصر"
  },
  {
    username: "بسمله احمد",
    password: "Basmla@2026",
    name: "بسمله احمد",
    rank: 4,
    group: "الجمعة الساعة 3 العصر"
  }
];


const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const themeToggle = document.getElementById("themeToggle");
const menuItems = document.getElementById("menuItems");
const profileData = document.getElementById("profileData");
const videoBox = document.getElementById("videoBox");

menuBtn.onclick = () => sidebar.classList.toggle("open");
themeToggle.onclick = () => document.body.classList.toggle("dark");

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  sidebar.classList.remove("open");
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 3000);
}

/* Login + حفظ الجلسة */
function login() {
  const u = username.value;
  const p = password.value;
  const user = users.find(x => x.username === u && x.password === p);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    afterLogin(user);
  } else toast("بيانات غير صحيحة");
}

function afterLogin(user) {
  toast("نورت المنصة 🌟");
  showSection("lessons");
  menuItems.innerHTML = `
    <li onclick="showSection('lessons')">الحصص</li>
    <li onclick="showSection('exams')">الاختبارات</li>
    <li onclick="showSection('leaderboard')">الصدارة</li>
    <li onclick="showSection('profile')">الحساب</li>
    <li onclick="showSection('contact')">تواصل معنا</li> 
  `;
  profileData.innerHTML = `
    الاسم: ${user.name}<br>
    الترتيب: ${user.rank}<br>
    المجموعة: ${user.group}<br>
    السنة الدراسية: الصف الثالث الثانوي
  `;
}

/* تسجيل خروج */
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

/* Restore session */
const saved = localStorage.getItem("user");
if (saved) afterLogin(JSON.parse(saved));

/* الحصص */
function openLesson(videoId) {
  toast("عاش يا بطل 💪");
  videoBox.innerHTML = `
    <iframe width="100%" height="500"
    src="https://www.youtube.com/embed/${videoId}"
    allowfullscreen></iframe>`;
  document.getElementById("lessonsCards").style.display = "none";
  document.querySelector(".backBtn").style.display = "inline-block";
}

function backToLessons() {
  videoBox.innerHTML = "";
  document.getElementById("lessonsCards").style.display = "grid";
  document.querySelector(".backBtn").style.display = "none";
}

/* الاختبارات */
const exams = [
  { title: "اختبار الحصة الأولى", link: "https://forms.microsoft.com/FORM_LINK_1" },
  { title: "اختبار الحصة الثانية", link: "https://forms.microsoft.com/FORM_LINK_2" },
  { title: "اختبار شامل", link: "https://forms.microsoft.com/FORM_LINK_3" }
];

// دالة فتح الاختبار
function openExam(index) {
  toast("بالتوفيق في الامتحان ✨");
  window.open(exams[index].link, "_blank");
}

// دالة توليد كروت الاختبارات
function loadExams() {
  const container = document.getElementById("examCards");
  container.innerHTML = ""; // مسح أي محتوى قديم

  exams.forEach((exam, index) => {
    container.innerHTML += `
      <div class="card" onclick="openExam(${index})">
        <i class="fa-solid fa-file-circle-check"></i>
        <h3>${exam.title}</h3>
      </div>
    `;
  });
}



/* لوحة الصدارة */
const leaders = [
  { name: "روئ السعدي", score: 95 },
  { name: "سارة محمد", score: 90 },
  { name: "مروان طاهر ", score: 85 }
];

const leadersList = document.getElementById("leaders");
leaders.forEach(l => {
  const li = document.createElement("li");
  li.textContent = `${l.name} - ${l.score} نقطة`;
  leadersList.appendChild(li);
});
