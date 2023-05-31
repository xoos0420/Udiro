const pathArray = window.location.pathname.split('/');
const festanum = pathArray[pathArray.length - 1];

for (let i = 1; i <= 100; i++) {
    fetchDataPlace(i);
}

function fetchDataPlace(placenum) {
    fetch(`https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/culture/place/${placenum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            processDataAll(data, placenum);
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
}

function processDataAll(data, placenum) {
    // 데이터 처리
    const placesContainer = document.querySelector('.place__container');

    // place 요소 생성
    const PlaceElement = document.createElement('div');
    PlaceElement.id = placenum;
    PlaceElement.className = 'place_image';
    placesContainer.appendChild(PlaceElement);
    PlaceElement.addEventListener('click', function (event) {
        const placeId = event.target.id;
        console.log(placeId);
        const url = `/culture/place/${placenum}`
        window.location.href = url;
    });

    // 장소 이미지 요소 생성
    const imgElement = document.createElement('img');
    imgElement.id = placenum;
    imgElement.src = data.MAIN_IMG;
    PlaceElement.appendChild(imgElement);

    // 텍스트 요소 생성
    const txtElement = document.createElement('div');
    txtElement.className = 'txt';
    PlaceElement.appendChild(txtElement);

    const titleElement = document.createElement('h2');
    titleElement.textContent = data.FAC_NAME;
    txtElement.appendChild(titleElement);

    const addrElement = document.createElement('div');
    addrElement.className = 'addr';
    txtElement.appendChild(addrElement);

    const addressElement = document.createElement('span');
    addressElement.textContent = data.ADDR;
    txtElement.appendChild(addressElement);
}

function search() {
    const puropose = document.getElementById("puropose").value
    const input = document.getElementById("inputField").value

    fetch(`https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/culture/place?purpose=${puropose}&input=${input}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
}