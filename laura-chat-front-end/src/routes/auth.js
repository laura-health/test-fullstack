export const userLogged = () => {
    let user = localStorage.getItem('user');
    if(user === null) return  false ;
    let step = JSON.parse(user);
    if(Object.keys(step).length === 0) return false;
    if(Object.keys(step.user).length === 0) return false;
    return true ;  
}