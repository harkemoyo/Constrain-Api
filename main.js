const App = {
    init (){
        App.addListeners();

    },
    addListeners(){
        let form = document.sampleForm;
        let fullName = document.getElementById('fullname');
        let email = document.getElementById('email');
        let pass = document.getElementById('pass');
        let cell = document.getElementById('cell');
        let regcode = document.getElementById('regcode');
        let pets = document.getElementById('pets');
    
    // after changing the whole value
    fullName.addEventListener('change',App.testName);
    email.addEventListener('change', App.testEmail);
    // typing 
    regcode.addEventListener('input', App.formatCode);
    cell.addEventListener('input', App.formatPhone);
    // when there is validation error do this
    fullName.addEventListener('invalid', App.fail);
    email.addEventListener('invalid', App.fail);

    // when submitting form do this
    form.addEventListener('submit', App.validate);

    },
    validate(ev){
        ev.preventDefault();
        let form = ev.target;
    
        let email = document.getElementById('email');
        console.log('willValidate', email.willValidate);
        //run validation on the whole form when submitting...
    
        // form controls have the following
        // invalid event
        console.log(email.validity);
        // validity readonly prop - a ValidityState object
        // ValidityState object props: (Boolean values)
        // badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow
        // stepMismatch, tooLong, tooShort, typeMismatch, valid, valueMissing
        //
        // willValidate readonly prop - boolean
    
        // validationMessage - readonly prop from browser validation
        //                    or setCustomValidity( ) method
    
        // checkValidity() checks element, returns boolean,
        //                fires the invalid event
    
        // reportValidity() checks AND reports result
        //                  this shows the browser tooltip with warning
        //                  can be called at any point to show message
    
        // setCustomValidity(msg) if called with non-empty string it
        //                    will change the value of validity.valid
        //                    to false and validity.customError to true
      },
      testName(ev) {
        let fullname = ev.target;
        fullname.setCustomValidity(''); //clear old message
        //built-in test for error based on type, pattern, and other attrs
        let currently = fullname.checkValidity();
      },
      formatCode(ev) {
        let regcode = ev.target;
        let val = regcode.value;
        val = val.toUpperCase();
        regcode.value = val; //converts anything typed to uppercase
        //check for i and o used instead of 1 or 0...
        regcode.setCustomValidity('');
        if (/(I|O)/.test(val)) {
          regcode.setCustomValidity(
            'There are no letters i or o in the codes. Should this be a one or a zero?'
          );
          regcode.reportValidity(); //display the message and trigger invalid event
        }
      },
      formatPhone(ev) {
        //format and correct the phone number as user is typing?
        //eg: +1 (555) 555-1212
        //restrict to numbers, parentheses, hyphens, and + as typing?
      },
        checkPasswordRequirements(input) {
        //check password requirements as user types
        // uppercase, lowercase, numeric, length >= 10
        // Allowed: [! @ # $ % ^ & * ( ) . , ? ; : ~]
        let response = {
          upper: true,
          lower: false,
          num: true,
          len: false,
          matches: null,
          invalid: true,
        };
        let txt = input.value.trim();
        response.upper = /[A-Z]/.test(txt);
        response.lower = /[a-z]/.test(txt);
        response.num = /[0-9]/.test(txt);
        response.len = input.value.trim().length >= 10;
        response.matches = txt.match(/([^A-Za-z0-9_!@#$%^&*().,?;:~])/);
        if (response.matches && response.matches.length > 0) {
          response.invalid = false;
         
        }
        testEmail();
        return response;
       
      },

    testEmail(ev){
        let email = ev.target;
        // console.log(email.validity);
        email.setCustomValidity('');//clear old message
        //built-in test for error based on type, pattern, and other attrs
        let current = email.checkValidity();

        // putting restriction
        if(current){
            let expEl = new RegExp('@gmail.com$', 'i');
            if (expEl.test(email.value) === false){
                email.setCustomValidity('Must be Gmail.com');
                //   console.log(email.validity);
            }
          
        }
        

    },
    fail(ev){
        let field= ev.target;
         //standard display change for any element
         switch (field.id){
            case 'email':
                let span = field.parentElement.querySelector('.errMessage');
                span.textContent = 'Must be a Gmail address';
         }
    }


}
document.addEventListener('DOMContentLoaded', App.init);