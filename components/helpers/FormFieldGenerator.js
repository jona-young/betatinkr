import InputField from '../blocks/InputField';

const FormFieldGenerator = ({ label, formValue, handleChange, valueType}) => {
    if (valueType == "string") {
        return <InputField label={label} formValue={formValue} handleChange={handleChange} inputMode={'text'} keyboardType={'default'} />
    }
    if (valueType == "number") {
        return <InputField label={label} formValue={formValue} handleChange={handleChange} inputMode={'numeric'} keyboardType={'number-pad'} />
    }
    if (valueType == "boolean") {
        return <InputField label={label} formValue={formValue} handleChange={handleChange} inputMode={'text'} keyboardType={'default'} />
    }

}

export default FormFieldGenerator;