package org.yescola.gestion.web.rest;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.yescola.gestion.security.AuthoritiesConstants;
import org.yescola.gestion.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthorityResource {

    private final UserService userService;

    public AuthorityResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/authorities")
    @PreAuthorize("hasRole('" + AuthoritiesConstants.ADMIN + "')")
    public List<String> listAuthorities() {
        return userService.getAuthorities();
    }
}
