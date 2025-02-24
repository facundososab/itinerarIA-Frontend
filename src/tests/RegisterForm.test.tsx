import {test, expect, describe, vi, it} from "vitest";
import RegisterForm from "../components/RegisterForm.tsx";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest';
import User from "../interfaces/User.ts";
import { ObjectId } from "mongodb";
import userEvent from "@testing-library/user-event";

//Simulo un usuario
const testUser: User = {
    id: new ObjectId(),
    isAdmin: false,
    username: "nikitox",
    password: "Nikitox123",
    names: "Nicolás Roberto",
    lastName: "Escobar",
    mail: "nicoescobar666@gmail.com",
    phoneNumber: "3416481402",
    dateOfBirth: "2004-04-24"
}

//Mockeo el contexto
const signupMock = vi.fn();

vi.mock("../context/AuthContext.tsx", ()=>{
    return {
        useAuth: vi.fn(
            () => ({
                user: null,
            isAuthenticated: false,
            isAdmin: false,
            
            // Asigno la función signup del contexto a la función mockeada signupMock
            //Entonces cuando el form llame a signup, se llamará a signupMock
            signup: signupMock,
            
            authErrors: [],
            signIn: vi.fn(), //Simulo una función vacía
            isLoading: false,
            logout: vi.fn(),
            updateUser: vi.fn(),
            })
        )
    }
})

//Luego de mockear el contexto, importo el contexto real
import { useAuth } from "../context/AuthContext.tsx";

describe("RegisterForm", ()=>{

    beforeEach(()=>{
        
       
        render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
        );
    })

    it("should send the form", async ()=>{

        //Obtengo los inputs a partir de sus labels
        const userNameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const firstNameInput = screen.getByLabelText(/First Name/i);
        const lastNameInput = screen.getByLabelText(/Last/i); //Lo busco con expresiones regulares
        const emailInput = screen.getByLabelText(/mail/i);
        const phoneInput = screen.getByLabelText(/Phone/i);
        const dateOfBirthInput = screen.getByLabelText(/Birth/i);

        //Simulo rellenar el formulario
        await userEvent.type(userNameInput,testUser.username );
        await userEvent.type(passwordInput, testUser.password);
        await userEvent.type(firstNameInput, testUser.names);
        await userEvent.type(lastNameInput, testUser.lastName);
        await userEvent.type(emailInput, testUser.mail);
        await userEvent.type(phoneInput, testUser.phoneNumber);
        await userEvent.type(dateOfBirthInput, testUser.dateOfBirth);
        
        //Obtengo el botón y simulo clickearlo
        const submitBtn = screen.getByRole("button",{name: /Register/i});
        await userEvent.click(submitBtn);

        //Una vez simulado el envío del formulario, realizo los tests
        expect(signupMock).toHaveBeenCalledTimes(1);
        expect(signupMock).toHaveBeenLastCalledWith(
            {
                username: testUser.username,
                password: testUser.password,
                names: testUser.names,
                lastName: testUser.lastName,
                mail: testUser.mail,
                phoneNumber: testUser.phoneNumber,
                dateOfBirth: testUser.dateOfBirth
            }
        )

    });
});
