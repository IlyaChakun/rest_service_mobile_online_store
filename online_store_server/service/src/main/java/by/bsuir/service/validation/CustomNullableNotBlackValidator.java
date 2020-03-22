package by.bsuir.service.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

public class CustomNullableNotBlackValidator implements ConstraintValidator<CustomNullableNotBlank, CharSequence> {

    @Override
    public boolean isValid(CharSequence charSequence, ConstraintValidatorContext context) {
        return Objects.isNull(charSequence) || charSequence.toString().trim().length() > 0;
    }

}

