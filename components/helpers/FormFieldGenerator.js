import InputField from '../blocks/inputs/InputField';
import BoolButton from '../blocks/inputs/BoolButton';

const FormFieldGenerator = ({ label, formValue, handleChange, valueType, handleChangeDeloadWeek}) => {
    if (valueType == "string") {
        return <InputField 
                    label={label} 
                    formValue={formValue} 
                    handleChange={handleChange} 
                    inputMode={'text'} 
                    keyboardType={'default'} />
    }
    if (valueType == "number") {
        return <InputField 
                    label={label} 
                    formValue={formValue} 
                    handleChange={handleChange}
                    inputMode={'numeric'} 
                    keyboardType={'number-pad'} />
    }
    if (valueType == "boolean") {
        return <BoolButton 
            handleChangeDeloadWeek={handleChangeDeloadWeek} 
                    label={label}
                    buttonLabel={formValue} />
    }

}

export default FormFieldGenerator;