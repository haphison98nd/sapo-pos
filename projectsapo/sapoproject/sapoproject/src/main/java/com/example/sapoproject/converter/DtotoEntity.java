package com.example.sapoproject.converter;

import org.springframework.data.domain.Page;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public class DtotoEntity {
    public static Object getDTO(Object oEntity, Object oDto) {
        Field[] fieldDto = oDto.getClass().getDeclaredFields();
        Field[] fieldEntity = oEntity.getClass().getDeclaredFields();
        try {
            for (Field field : fieldDto) {
                field.setAccessible(true);
                Object value = field.get(oDto);
                if (!((value == null))) {
                    for (Field field1 : fieldEntity){

                        if(field1.getName().toLowerCase().equals(field.getName().toLowerCase())){
                            field1.setAccessible(true);
                            field1.set(oEntity,value);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Lôi phần get type");
        }

    return oEntity;}

    public static Object getDTOTest(Class oE, Object oDto) {
        Object oEntity=null;
        Field[] fieldDto = oDto.getClass().getDeclaredFields();
        Field[] fieldEntity = oE.getDeclaredFields();
        try {
            oEntity=oE.getDeclaredConstructor().newInstance();
            for (Field field : fieldDto) {
                field.setAccessible(true);
                Object value = field.get(oDto);
                if (!((value == null) )) {
                        for (Field field1 : fieldEntity){

                        if(field1.getName().toLowerCase().equals(field.getName().toLowerCase())){
                            field1.setAccessible(true);
                            field1.set(oEntity,value);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Lôi phần get type");
        }


        return oEntity;
    }
    public static Iterable<?> getList(Iterable<?> objects,Class aClass){
        try {

            List<Object> list=new ArrayList<>();
            for (Object o1:objects){
           //     Object o=aClass.getDeclaredConstructor().newInstance();
                list.add(getDTOTest(aClass,o1));
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            return  null;
        }
    }
    public static Page<?> getDto(Page<?> entity, Class dto){
        Page<Object> page=entity.map(new Function<Object, Object>() {
            @Override
            public Object apply(Object o) {
                    return getDTOTest(dto,o);
            }
        });
    return page;}
}
