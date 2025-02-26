/// <reference types="cypress" />

describe("itinerarIA landpage test", ()=>{
    
    beforeEach(function () {
        //First I mock a login to get authenticated
        //This must be done with the data of a user that is currently in the testing database
        cy.request('POST', 'http://localhost:3000/api/auth/login', {
          username: 'blas1234',
          password: 'Blas1234'
        }).then((response) => {
          const token = response.body.token;
        //Now I reset the database
          cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/testing/reset',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        });
        
        //Now I add a user to the database
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

        cy.visit('http://localhost:5174');
    });
    
    it("should renders the app", ()=>{
        cy.visit('http://localhost:5174');
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
    beforeEach(()=>{
        cy.visit('http://localhost:5174');
        cy.contains("Sign in").click();
        cy.get('[placeholder="Enter your username"]').type("blas1234");
        cy.get('[placeholder= "Enter your password"]').type("Blas1234");
        cy.get('form button').contains("Sign in").click();
    })

    it("Let's check if the form can be opened", ()=>{
        cy.contains("New Itinerary").click();
        cy.get('form').contains("Create Itinerary");
    })
    
    it("//Let's check if the form can be closed", ()=>{
        cy.contains("New Itinerary").click();
        cy.get('form').contains("Create Itinerary");

        cy.get('#login-form-close-button').click();
        cy.get('form').should('not.exist'); //None form should exist

    })
});