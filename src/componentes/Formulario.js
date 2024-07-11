import React,{useState} from 'react';
import styled from 'styled-components';
import db from '../fireBase/firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 
 

const Formulario = () => {

    const [nombre,cambiarNombre]=useState('');
    const [correo, cambiarCorreo]=useState('');

    const onSubmit= async (e) => { 
        e.preventDefault();

        try{

            await addDoc(collection(db,'usuarios'),{
                  nombre:nombre,
                  correo:correo
              });

        }

        catch(error){
            console.log(error);
        }
        cambiarNombre('');
        cambiarCorreo('');
    }

    

    return ( 
        <form action='' onSubmit={onSubmit}>

            <Input
            type='text'
            name='nombre'
            placeholder='Nombre'
            value={nombre}
            onChange={(e)=>cambiarNombre(e.target.value)}
            />

            <Input
            type='email'
            name='correo'
            placeholder='Correo'
            value={correo}
            onChange={(e)=>cambiarCorreo(e.target.value)}
            />

            <Boton type='submit'>Agregar</Boton>

        </form>
     );
}
 

const Input=styled.input`
    padding:10px;
    border:2px solid rgba(0,0,0,0.2);
    border-radius:3px;
    margin-bottom:10px;
    transition:0.2s  ease all;
    outline:none;
    text-aling:center;
    &:focus{
        border:2px solid #3D76E9;
    }
`;

const Boton=styled.button`
    padding:10px 30px;
    border:none;
    cursor:pointer;
    border-radius:3px;
    transition:0.3s ease all;
    outline:none;
    background:#C4C4C4;
    font-size:12px;
    margin-left:25px;

    &:hover{
        background:#3D76E9;
    }
`;

export default Formulario;