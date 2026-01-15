/*************************************************
 * CONFIG
 *************************************************/
const API_URL = "PUT_YOUR_APPS_SCRIPT_URL";

/*************************************************
 * HELPERS
 *************************************************/
function qs(id) {
  return document.getElementById(id);
}

function show(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  qs(view).classList.add("active");
}

function getUser() {
  return JSON.parse(sessionStorage.getItem("user"));
}

function setUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

/*************************************************
 * AUTH
 *************************************************/
async function login() {
  qs("loginMsg").innerText = "جارٍ التحقق...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        username: qs("username").value.trim(),
        password: qs("password").value
      })
    });

    const data = await res.json();

    if (data.status === "success") {
      setUser(data.user);
      data.user.role === "admin" ? loadAdmin() : loadStudent();
    } else {
      qs("loginMsg").innerText = data.message;
    }

  } catch (err) {
    qs("loginMsg").innerText = "خطأ في الاتصال بالسيرفر";
  }
}

function logout() {
  sessionStorage.clear();
  show("login");
}

/*************************************************
 * STUDENT DASHBOARD
 *************************************************/
async function loadStudent() {
  show("student");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "getStudentData",
        user_id: getUser().id
      })
    });

    const data = await res.json();

    qs("lessons").innerHTML = data.lessons.length
      ? data.lessons.map(l => `<p>📘 ${l.title}</p>`).join("")
      : "<p>لا توجد حصص</p>";

    qs("exams").innerHTML = data.exams.length
      ? data.exams.map(e => `<p>📝 ${e.title}</p>`).join("")
      : "<p>لا توجد اختبارات</p>";

  } catch {
    qs("lessons").innerText = "خطأ في تحميل البيانات";
  }
}

/*************************************************
 * ADMIN DASHBOARD
 *************************************************/
async function loadAdmin() {
  show("admin");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "getAdminData"
      })
    });

    const data = await res.json();

    qs("students").innerHTML = data.students.map(
      s => `<p>👤 ${s.name} – ${s.group}</p>`
    ).join("");

    qs("stats").innerHTML = `
      <strong>📊 الإحصائيات</strong><br>
      عدد الطلاب: ${data.stats.students}<br>
      عدد الحصص: ${data.stats.lessons}<br>
      عدد الاختبارات: ${data.stats.exams}
    `;

  } catch {
    qs("admin").innerHTML = "خطأ في تحميل لوحة المشرف";
  }
}

/*************************************************
 * RESTORE SESSION
 *************************************************/
const saved = getUser();
if (saved) {
  saved.role === "admin" ? loadAdmin() : loadStudent();
}
