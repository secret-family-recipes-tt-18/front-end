import { useState, useEffect, useContext} from 'react';
import * as yup from "yup";

import { RecipesContext } from "../contexts/RecipesContext";

const useValidation = (initialFormValues, shema, userData) => {

    const [userError, setUserError] =useState(initialFormValues);
    const { buttonDisabledHook } = useContext(RecipesContext);
    const setDisabled = buttonDisabledHook.func;

    useEffect(() => {
        console.log(userError);
        shema
          .isValid(userData)
          .then((valid) => {
            setDisabled(!valid);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [userData, userError,setDisabled, shema]);

    const handleSetError = (name, value) => {
        yup
          .reach(shema, name)
          .validate(value)
          .then(() => setUserError({ ...userError, [name]: "" }))
          .catch((err) => {
            setUserError({ ...userError, [name]: err.errors[0] });
          });
      };

    
    return {userError, handleSetError};
}

export default useValidation;