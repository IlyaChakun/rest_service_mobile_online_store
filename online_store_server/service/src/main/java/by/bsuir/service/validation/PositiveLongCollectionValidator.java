package by.bsuir.service.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Collection;
import java.util.stream.Collectors;

public class PositiveLongCollectionValidator implements ConstraintValidator<PositiveLongCollection, Object> {

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value instanceof Collection<?>) {
            try {
                Collection<?> newValues =
                        ((Collection<?>) value)
                                .stream()
                                .filter(elem -> Long.parseLong(elem.toString()) >= 0)
                                .collect(Collectors.toList());
                return ((Collection<?>) value).size() == newValues.size();
            } catch (NumberFormatException e) {
                return false;
            }
        } else {
            return false;
        }
    }

}
