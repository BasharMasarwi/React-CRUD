export const validationUserData=(user)=>{
    let errors={};
    if(user.name.trim()==""){
        errors.name="userName is Required";
    }
     else if(user.name.trim().length<3){
        errors.name="userName must at least 3 characters";
     }
     if(user.email.trim()==""){
        errors.email="email is Required";
    }
     else if(user.email.trim().length<9){
        errors.email="email must at least 9 characters";
     }
     if(user.password.trim()==""){
        errors.password="password is Required";
    }
     else if(user.password.trim().length<3){
        errors.password="password must at least 3 characters";
     }
     return errors;
    
    }








