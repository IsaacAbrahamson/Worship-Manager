package com.isaacabrahamson.worship_manager_api.rest.type;

import com.isaacabrahamson.worship_manager_api.domain.type.TypeDto;
import com.isaacabrahamson.worship_manager_api.domain.type.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/type")
public class TypeController {
    private final TypeService typeService;

    @GetMapping("/")
    public List<TypeDto> findAllTypes() {
        return typeService.findAllTypes();
    }

    @PostMapping("/")
    public TypeDto createType(@RequestBody TypeDto typeDto) {
        return typeService.createType(typeDto);
    }

    @DeleteMapping("/{typeId}")
    public void deleteType(@PathVariable Long typeId) {
        typeService.deleteType(typeId);
    }
}
