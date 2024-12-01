package com.isaacabrahamson.worship_manager_api.domain.type;

public class TypeMapper {
    public static TypeDto toTypeDto(Type type) {
        return new TypeDto(
                type.getId(),
                type.getType(),
                type.getColor(),
                type.getBackground(),
                type.getUserId()
        );
    }

    public static Type fromTypeDto(TypeDto typeDto) {
        return new Type(
                typeDto.getId(),
                typeDto.getType(),
                typeDto.getColor(),
                typeDto.getBackground(),
                typeDto.getUserId()
        );
    }
}
