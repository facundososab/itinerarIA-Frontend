/// <reference types="cypress" />

describe("itinerarIA landpage test", ()=>{
    
  beforeEach(function () {
    cy.visit('http://localhost:5174');
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    //     //First I mock a login to get authenticated
    //     //This must be done with the data of a user that is currently in the testing database
    //     cy.request('POST', 'http://localhost:3000/api/auth/login', {
    //       username: 'blas1234',
    //       password: 'Blas1234'
    //     }).then((response) => {
    //       const token = response.body.token;
    //     //Now I reset the database
    //       cy.request({
    //         method: 'POST',
    //         url: 'http://localhost:3000/api/testing/reset',
    //         headers: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       });
    //     });
        
    // Now I add a user to the database
        const user = {
            "username": "blas1234",
            "password": "Blas1234",
            "names": "nicolas roberto",
            "lastName": "escobar",
            "mail": "nicoescobar666@gmail.com",
            "phoneNumber": "3416481402",
            "dateOfBirth": "2024-04-24",
        }
      cy.request('POST', 'http://localhost:3000/api/auth/register', user);
     });
    
    it("should renders the app", ()=>{
        cy.contains("Discover Your");
    })

    it("the user should be able to log in", ()=>{
        cy.contains("Sign in").click();
        cy.get('[placeholder="Enter your username"]').type("blas1234");
        cy.get('[placeholder= "Enter your password"]').type("Blas1234");
        cy.get('form button').contains("Sign in").click();
    });
  

});

describe("Once the user is already logged in", ()=>{
  beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        username: 'blas1234',
        password: 'Blas1234'
      }).then((response) => {
        cy.setCookie('token', response.body.token)

      })
     cy.visit('http://localhost:5174');
  })
  

  it("Let's check if the itinerary can be created", () => {
    cy.request('POST', 'http://localhost:3000/api/places', 
{
    "name": "Lugar 1",
    "latitude": 20.078542,
    "longitude": 77.012547,
    "zipCode": "12345",
    "province": "Provincia",
    "country": "Pais"
})
      cy.contains("New Itinerary").click();
      cy.get('[data-test-id="login-form"]').should('exist');

    // Rellenar el título
    cy.get('input#title').type('Itinerario de Prueba');

    // Rellenar la descripción
    cy.get('input#description').type('Este es un itinerario de prueba para Cypress');

    // Seleccionar fechas
    cy.get('input#dayStart').type('2025-04-10');
    cy.get('input#dayEnd').type('2025-04-15');

    // Seleccionar un lugar del dropdown
    cy.get('select#place').select(1); // Asegúrate de que haya opciones cargadas

    // Enviar el formulario
    cy.get('button').contains('Create Itinerary').click();

    cy.contains("Itinerario de Prueba");

  })

  // it("Let's check if the itinerary can be opened", () => {
  //   cy.get('[data-test-id=itineraries-list]').contains("Itinerario de Prueba").click();
  //   cy.contains("Activities");
  // }
  // )

//   it("Let's create a second itinerary", () => {
//     cy.request('POST', 'http://localhost:3000/api/places',
// {
//   "name": "Lugar 2",
//   "latitude": 20.078542,
//   "longitude": 78.012547,
//   "zipCode": "12345",
//   "province": "Provincia",
//   "country": "Pais"
//       })
//     cy.contains("New Itinerary").click();
//     cy.get('[data-test-id="login-form"]').should('exist');

//     // Rellenar el título
//     cy.get('input#title').type('Itinerario 2');

//     // Rellenar la descripción
//     cy.get('input#description').type('Este es un itinerario de prueba para Cypress');


//     // Seleccionar fechas
//     cy.get('input#dayStart').type('2025-04-10');
//     cy.get('input#dayEnd').type('2025-04-15');

//     // Seleccionar un lugar del dropdown
//     cy.get('select#place').select(2); // Asegúrate de que haya opciones cargadas

//     // Enviar el formulario
//     cy.get('button').contains('Create Itinerary').click();

//     cy.contains("Itinerario de Prueba 2");

//   })
  
    
    // it("//Let's check if the form can be closed", ()=>{
    //     cy.contains("New Itinerary").click();
    //     cy.get('form').contains("Create Itinerary");

    //     cy.get('#login-form-close-button').click();
    //     cy.get('form').should('not.exist'); //None form should exist

    // })
});