const liffId = '1661153609-Pnvd7Mr6';

function main(){
    liff.init({liffId: liffId});
    liff.ready.then(() => {
        if(!liff.isLoggedIn()){
            liff.login();
        }
        liff.getProfile().then(profile => {
            document.getElementById('img').src = profile.pictureUrl;
            document.getElementById('imgUrl').value = profile.pictureUrl;
            document.getElementById('userId').value = profile.userId;
            document.getElementById('name').value = profile.displayName;
        });
    });
}

main();