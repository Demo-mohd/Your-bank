let members = {};
let secretCode = "";
let isFirstLogin = true;

function login() {
    const password = document.getElementById("password").value;
    
    if (isFirstLogin) {
        if (password) {
            secretCode = password;
            isFirstLogin = false;
            showWelcomeScreen();
        } else {
            alert("يرجى إدخال كلمة مرور.");
        }
    } else {
        if (password === secretCode) {
            showWelcomeScreen();
        } else {
            document.getElementById("errorMessage").innerText = "رمز سري غير صحيح.";
        }
    }
}

function showWelcomeScreen() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("welcomeScreen").style.display = "block";
    setTimeout(() => {
        document.getElementById("welcomeScreen").style.display = "none";
        document.getElementById("appSection").style.display = "block";
    }, 3000); // 3 ثواني
}

function setPassword() {
    const newPassword = document.getElementById("newPassword").value;
    if (newPassword) {
        secretCode = newPassword;
        document.getElementById("setupSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
    } else {
        alert("يرجى إدخال كلمة مرور جديدة.");
    }
}

function logout() {
    document.getElementById("appSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("password").value = '';
}

function resetPassword() {
    const newPassword = prompt("أدخل كلمة المرور الجديدة:");
    if (newPassword) {
        secretCode = newPassword;
        alert("تم إعادة تعيين كلمة المرور بنجاح.");
    }
}

function addMember() {
    const name = document.getElementById("memberName").value;
    if (name && !members[name]) {
        members[name] = 0;
        document.getElementById("memberName").value = '';
        renderMembers();
    } else {
        alert("يرجى إدخال اسم غير مكرر.");
    }
}

function removeMember(name) {
    delete members[name];
    renderMembers();
}

function addAmount(name) {
    const amount = parseInt(prompt("أدخل المبلغ لإضافته:"));
    if (!isNaN(amount)) {
        members[name] += amount;
        renderMembers();
    }
}

function removeAmount(name) {
    const amount = parseInt(prompt("أدخل المبلغ لحذفه:"));
    if (!isNaN(amount)) {
        members[name] -= amount;
        renderMembers();
    }
}

function renderMembers() {
    const membersList = document.getElementById("membersList");
    membersList.innerHTML = '';

    let totalAmount = 0;

    for (const name in members) {
        totalAmount += members[name];
        const memberDiv = document.createElement("div");
        memberDiv.className = "member";
        memberDiv.innerHTML = `
            <span>${name}: ${members[name]} جنيهاً</span>
            <button onclick="addAmount('${name}')">إضافة</button>
            <button onclick="removeAmount('${name}')">حذف</button>
            <button onclick="removeMember('${name}')">إزالة</button>
        `;
        membersList.appendChild(memberDiv);
    }

    // تحديث اسم الفرد الحالي
    if (Object.keys(members).length > 0) {
        document.getElementById("currentMemberName").innerText = Object.keys(members)[0]; // افتراض اسم أول فرد
    } else {
        document.getElementById("currentMemberName").innerText = "اسم الفرد";
    }

    document.getElementById("totalAmount").innerText = totalAmount;
}

function saveChanges() {
    alert("تم حفظ التحديثات بنجاح.");
}
