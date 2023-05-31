for (let i = 1; i <= 10; i++) {
    fetchDataFesta(i);
    fetchDataPlace(i);
}

function fetchDataFesta(festanum) {
    fetch(`https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/culture/festa/${festanum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            processDataAllf(data, festanum);
        })
        .catch((error) => {
            console.error('ERROR', error);
        });
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

// 함수-----------------------------------------
async function processDataAllf(data, festanum) {
    // 데이터 처리
    const festivalsContainer = document.querySelector('.festival__container');

    // festival 요소 생성
    const festivalElement = document.createElement('div');
    festivalElement.id = festanum;
    festivalElement.className = 'festival_image';
    festivalsContainer.appendChild(festivalElement);
    festivalElement.addEventListener('click', function (event) {
        const festivalId = event.target.id;
        const url = `/culture/festa/${festanum}`;
        window.location.href = url;
    });

    // 장소 이미지 요소 생성
    const imgElement = document.createElement('img');
    imgElement.id = festanum;
    imgElement.src = data.MAIN_IMG;
    festivalElement.appendChild(imgElement);

    // 텍스트 요소 생성
    const txtElement = document.createElement('div');
    txtElement.className = 'txt';
    festivalElement.appendChild(txtElement);

    const titleElement = document.createElement('h2');
    titleElement.textContent = data.TITLE;
    txtElement.appendChild(titleElement);

    const fplaceElement = document.createElement('span');
    fplaceElement.textContent = data.PLACE;
    txtElement.appendChild(fplaceElement);

    const dateElement = document.createElement('div');
    dateElement.className = 'date';
    txtElement.appendChild(dateElement);

    const startDate = new Date(data.STRTDATE);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const endDate = new Date(data.END_DATE);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const dateRange = `${formattedStartDate} ~ ${formattedEndDate}`;

    const dateRangeSpan = document.createElement('span');
    dateRangeSpan.textContent = dateRange;
    await dateElement.appendChild(dateRangeSpan);
}

async function processDataAll(data, placenum) {
    // 데이터 처리
    const placesContainer = document.querySelector('.place__container');

    // place 요소 생성
    const PlaceElement = document.createElement('div');
    PlaceElement.id = placenum;
    PlaceElement.className = 'place_image';
    placesContainer.appendChild(PlaceElement);
    PlaceElement.addEventListener('click', function (event) {
        const url = `/culture/place/${placenum}`;
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
