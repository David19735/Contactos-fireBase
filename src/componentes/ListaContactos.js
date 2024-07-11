import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import db from '../fireBase/firebaseConfig';
import Contacto from './Contacto';
import { collection,onSnapshot } from 'firebase/firestore';

const ListaContactos = () => {

    const [contactos,cambiarContactos]=useState([]);
    useEffect(()=>{
        
        onSnapshot(
            collection(db,'usuarios'),
        (snapshot)=>{

            const arregloUsuarios=snapshot.docs.map((documento)=>{
                return {...documento.data(),id:documento.id}
            })
            cambiarContactos(arregloUsuarios);
        },
        (error)=>{
            alert(error);
        }
    );

    
    },[])

    return (
        
        contactos.length>0 &&
        <ContenedorContactos>
          

            {
                contactos.map((contacto)=>{
                    return <Contacto 
                    key={contacto.id} 
                    id={contacto.id} 
                    nombre={contacto.nombre}
                     correo={contacto.correo}/>
                })
            }
            

        </ContenedorContactos>
     );
}


const ContenedorContactos=styled.div`
    margin-top:40px;
`;
 
export default ListaContactos;