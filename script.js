document.addEventListener('DOMContentLoaded', function(){

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHiderButton = document.getElementById('show-hide')

    loginForm.addEventListener('submit',function(event){
        event.preventDefault();
        //TO DO: Agregar metodo que valide el formulario
        validateForm();
    })

    emailInput.addEventListener('blur',function () {
        //Blur cuando salimos del formulario
        //TO DO: Agregar metodo que valide el email
        validateEmail();
    })

    emailInput.addEventListener('change',function(){
        //TO DO: Agregar metodo que limpie el error
        clearError(emailError);

    })

    passwordError.addEventListener('change',function (){
        //TO DO: Agregar metodo que limpie el error
        clearError(passwordError);
    })

    confirmPasswordInput.addEventListener('change',function(){
        //TO DO: Agregar metodo que limpie el error
        clearError(confirmPasswordError);
    })

    function validateForm(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            //Guardar mail en el localStorage y generar un JSON en consola
            saveToLocalStorage();
            alert('Has ingresado con exito')
        }
    }

    showHiderButton.addEventListener('click',function(){
        if(passwordInput.type == 'password'){
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        }else{
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    })

    function validateEmail(){
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim()//Elimina espacios vacios
        
        if(!emailRegex.test(emailValue)){
            showError(emailError,"Ingresa un email valido")
            return false
        }
        return true
    }

    function validatePassword(){
        const passwordValue = passwordInput.value.trim();
        if (passwordValue.length < 6) {
           showError(passwordError,"Ingresa una contraseña de al menos 6 caracteres")
            return false
        }
        return true;
    }

    function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        if (passwordValue != confirmPasswordValue) {
            showError(confirmPasswordError,"Las contraseñas no coinciden")
            return false;
        }
        return true;
    }

    function showError(errorElement,message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }

    function clearError(errorElement){
        errorElement.innerHTML = '';
        errorElement.style.display = "none";
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email',emailValue);
        const body = bodyBuilderJSON();
        console.log(body)
    }

    function bodyBuilderJSON(){
        return{
            "email" : emailInput.value,
            "password" : passwordInput.value
        }
    }

});