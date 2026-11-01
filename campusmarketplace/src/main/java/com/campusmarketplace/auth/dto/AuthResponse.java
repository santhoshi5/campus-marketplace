
package com.campusmarketplace.auth.dto;

public class AuthResponse {

    private String message;
    private Long userId;
    private String fullName;
    private String email;
    private String role;

    public AuthResponse(String message, Long userId,
                        String fullName, String email, String role) {
        this.message = message;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
