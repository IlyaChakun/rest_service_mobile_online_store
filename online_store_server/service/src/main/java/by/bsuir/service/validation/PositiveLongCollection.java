package by.bsuir.service.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Documented
@Constraint(validatedBy = PositiveLongCollectionValidator.class)
@Target({METHOD, FIELD, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface PositiveLongCollection {

    String message() default "The values must be positive and numeric!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
