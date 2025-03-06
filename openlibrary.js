


function bookRecommendations(data) {
    //tarkistetaan onko datalistalla kirjoja
    if (!data.works || data.works.length === 0) {
        document.getElementById("KIRJAT").innerHTML = "<p>No books found</p>";
        return;
    }
    // luodaan muuttuja, johon tallennetaan HTML-sivulla esitettävä tieto
    let books = '';
    // luodaan lista jo käytetyistä indekseistä, jotta haettujen kirjojen listalle ei tule duplikaatteja, käyttö rivi 21-23
    let usedIndexes = new Set();
    // luodaan lista-muuttuja, johon tallennetaan 4 kirjaa
    let randomBooks = [];

    //Valitaan 4 kirjaa listalta (koska lista on itsessään liian pitkä)
    while (randomBooks.length < 4) {
        // käytetään Math.random funktiota kirjan indeksin hakuun, kertominen datan pituudella
        let randomIndex = Math.floor(Math.random() * data.works.length);
        // varmistetaan, että yksi kirja ei tule listalle tuplana
        if (!usedIndexes.has(randomIndex)) {
            randomBooks.push(data.works[randomIndex]);
            usedIndexes.add(randomIndex);
        }
    }
    // Esitetään jokaisen 'random' kirjan data HTML-sivulla käyttäen forEach-loopia
    randomBooks.forEach(book => {
        // haetaan kirjan kansikuva ja tallennetaan se bookCover-muuttujaan
        let bookCover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        // lisätään books-muuttujaan dataa
        books += `
            <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                <div class="team-member">
                    <div class="member-img">
                        <img src="${bookCover}" class="img-fluid" alt="Book Cover">
                    </div>
                    <div class="member-info">
                        <h4>${book.title}</h4>
                        <span>${book.author_name}</span>
                    </div>
                </div>
            </div>
        `;
    });
    // books-muuttujan sisältö esitetään KIRJAT id:llä löytyvässä elementissä HTML-sivulla
    //  Se lisätään vielä erillisen divin sisälle, jotta tyylittelyt näkyvät oikein
    document.getElementById("KIRJAT").innerHTML = `
        <div class="row justify-content-center gy-4">${books}</div>
    `;
}


fetch('https://openlibrary.org/trending/daily.json')
    .then(function (response) {
        return response.json()
    })
    // Käsitellään muunnettu (eli JSON muotoinen) vastaus
    // funktion kerro() kutsuminen 
    .then(function (responseJson) {
    bookRecommendations(responseJson);
    })
    // catch error
    //  mikäli tietoa ei löydy, esitetään HTML-sivulla viesti: Titeoa ei pystytä hakemaan
    .catch(function (error) {
    document.getElementById("KIRJAT").innerHTML = "<p>Tietoa ei pystytä hakemaan</p>";
})


