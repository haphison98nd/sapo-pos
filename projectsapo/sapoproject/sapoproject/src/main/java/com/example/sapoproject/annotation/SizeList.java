package com.example.sapoproject.annotation;

import com.example.sapoproject.annotation.valite.SizeL;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.Size;
import java.util.List;

public class SizeList  implements ConstraintValidator<SizeL, List<?>> {
    int dem;
    @Override
    public void initialize(SizeL constraintAnnotation) {
        dem=constraintAnnotation.size();
    }

    @Override
    public boolean isValid(List<?> objects, ConstraintValidatorContext constraintValidatorContext) {
        if(objects==null){
            System.err.println("là nlll");
            return true;
        }
        if(objects.size()<=dem)
        {
        return true;
        }
        return false;
    }
}
