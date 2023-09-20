import {FormInputLabel, Group, InputWithStyle} from './form-input.styles.jsx'

const FormInput = ({label, ...otherProps}) => {

    return (
        <Group>
            <InputWithStyle/>
            {label  && (
                <FormInputLabel
                    shrink={otherProps.value.length}>  
                    {label}
                </FormInputLabel>
            )}


        </Group>
    )
}

export default FormInput;