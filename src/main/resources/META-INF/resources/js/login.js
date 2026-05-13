// [12주차 과제] 로그인 화면 입력값 체크 + SHA-256 해시 후 전송

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    const msg = document.getElementById(fieldId + 'Msg');
    if (msg) msg.textContent = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

async function validateAndLogin() {
    let valid = true;

    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // ① 아이디 유효성: 4~20자 영문/숫자
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(username)) {
        showError('usernameInput', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('usernameInput');
    }

    // ② 패스워드 유효성: 8자 이상 영문+숫자+특수문자
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordInput', '8자 이상, 영문+숫자+특수문자를 모두 포함해야 합니다.');
        valid = false;
    } else {
        clearError('passwordInput');
    }

    // ③ 통과 시 로그인 실행
    if (valid) await submitLogin();
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    // SHA-256 해시 후 hidden 필드로 전송 (회원가입과 동일한 해싱 방식)
    const hashed = await hashPassword(password);
    document.getElementById('hashedLoginPassword').value = hashed;
    document.getElementById('loginForm').submit();
}
