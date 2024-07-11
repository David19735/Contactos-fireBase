import React, { useState } from 'react';
import db from '../fireBase/firebaseConfig';
import styled from 'styled-components';
import {doc,deleteDoc,updateDoc} from 'firebase/firestore';


const Contacto = ({correo,id,nombre}) => {

    const [editandoTarea,cambiarEditarTarea]=useState(false);
    const [nuevoNombre,cambiarNuevoNombre]=useState(nombre);
    const [nuevoCorreo,cambiarNuevoCorreo]=useState(correo);

    const actualizarContacto=async(e)=>{
        e.preventDefault();

        try{

            await  updateDoc(doc(db,'usuarios',id), {
                  nombre:nuevoNombre,
                  correo:nuevoCorreo
              });
        }
        catch(error){
            console.log("Error al actualizar el usuario");
            alert(error);
        }


        cambiarEditarTarea(false);
    }


    const borraContacto=async(id)=>{
       
        try{

            await  deleteDoc(doc(db,'usuarios',id));
        }
        catch(error){
            console.log("Error al eliminar el usuario");
            alert(error);
        }
    }
   

    return (
        <ContenedorContacto>
            {
                editandoTarea ?
                <form action='' onSubmit={actualizarContacto}>
                    <Input
                    type='text'
                    name='nombre'
                    placeholder='Nombre'
                    value={nuevoNombre}
                    onChange={(e)=>{cambiarNuevoNombre(e.target.value)}}
                    />
                    <Input
                    type='text'
                    name='correo'
                    placeholder='Correo'
                    value={nuevoCorreo}
                    onChange={(e)=>{cambiarNuevoCorreo(e.target.value)}}
                    />

                    <Boton type='submit'>Actualizar</Boton>
                </form>
                :
                <div>
                    <Nombre>{nombre}</Nombre>
                    <Correo>{correo}</Correo>
                   <Boton onClick={()=>cambiarEditarTarea(!editandoTarea)}>Editar</Boton> 
                   <Boton onClick={()=>borraContacto(id)}>Borrar</Boton>
                </div>
            }
        </ContenedorContacto>
      );
}

const ContenedorContacto=styled.div`
    padding:10px 0;
    border-botoom:1px solid rgba(0,0,0,0.2);
`;

const Nombre=styled.p`
    font-weight:bold;
`;

const Correo=styled.p`
    font-style:italic;
    color:#6b6b6b;
    margin:5px 0;
`;

const Boton=styled.button`
    padding:5px 20px;
    border:none;
    cursor:pointer;
    border-radius:3px;
    margin:0px 2px;
    margin-bottom:10px;
    transition:0.3s ease all;
    outline:none;
    background:#c4c4c4;
    color:#fff;
    font-size:14px;
    &:hover{
        background:#3d76e9;
    }
`;

const Input=styled.input`
    padding:10px;
    border:2px solid rgba(0,0,0,0.2);
    border-radius:3px;
    width:100%;
    margin-bottom:10px;
    transition:0.2s ease all;
    outline:none;
    text-align:center;
    
    &:focus{
        border:2px solid #3D76E9;
    }
`;
 
export default Contacto;