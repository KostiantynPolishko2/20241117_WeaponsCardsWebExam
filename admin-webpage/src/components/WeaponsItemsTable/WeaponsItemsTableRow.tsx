import React, { FC, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import { WeaponsTableRowWrapper } from './WeaponsItemsTableRow.styled';
import './WeaponsItemsTable.css';
import { HandleNameContext } from '../AdminPage/AdminPage';

interface IWeaponsItemsDto {
   model: string,
   name: string,
   type: string,
}

interface IError {
   message: string,
}

type TListRow = {
   isLoad: boolean,
}


const WeaponsItemsTableRow: FC<TListRow> = (props) => {
   const [weaponsItemsDto, setWeaponsItemsDto] = useState<Array<IWeaponsItemsDto>>([]);
   const [clientsError, setClientsError] = useState<IError | null>(null)

   const _handleName = useContext(HandleNameContext);

   const weaponsItemsRequest = useMemo(() => 
      axios.create({
        baseURL: 'http://localhost:5144/api/WeaponsItems',
        method: 'get',
        responseType: 'json',
        timeout: 4000
      }), []
    );

   const handleRequest = useCallback(() => {

      weaponsItemsRequest.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

      if(props.isLoad){
         weaponsItemsRequest.get('models')
         .then(responce => {
            setWeaponsItemsDto(responce.data);
            setClientsError(null);
            // console.log(weaponsItemsDto);
         })
         .catch(error => {
            setWeaponsItemsDto([]);
            setClientsError(error);
         });
      }
   }, [props.isLoad, weaponsItemsRequest]);

   useEffect(() => {
         handleRequest();
   }, [handleRequest]);

   if (clientsError != null){
      return (
         <WeaponsTableRowWrapper>
            <h3>Error401! Bad request.</h3>
         </WeaponsTableRowWrapper>
      );
   }

   return (
         <tbody>
               {weaponsItemsDto.map((item, i) => (
                  <tr key={i + 1} onClick={_handleName}>
                     <td>{i + 1}</td>
                     <td>{item.model}</td>
                     <td>{item.name}</td>
                     <td>{item.type}</td>
                  </tr>
               ))}
         </tbody>

   );
}

export default WeaponsItemsTableRow;
