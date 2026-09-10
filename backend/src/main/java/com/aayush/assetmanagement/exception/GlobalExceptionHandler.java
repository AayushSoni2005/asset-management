package com.aayush.assetmanagement.exception;

import com.aayush.assetmanagement.common.response.ApiResponse;
import com.aayush.assetmanagement.common.response.ResponseBuilder;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            ResourceNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadRequestException(
            BadRequestException ex) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateResourceException(
            DuplicateResourceException ex) {

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnauthorizedException(
            UnauthorizedException ex) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiResponse<Void>> handleForbiddenException(
            ForbiddenException ex) {

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationException(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .orElse("Validation failed.");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseBuilder.error(message));
    }

    @ExceptionHandler(Exception.class)
public ResponseEntity<ApiResponse<Void>> handleGlobalException(Exception ex) {

    ex.printStackTrace();

    log.error("Exception type: {}", ex.getClass().getName());
    log.error("Exception message: {}", ex.getMessage(), ex);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ResponseBuilder.error(ex.getMessage()));
}
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleDataIntegrityViolationException(
            DataIntegrityViolationException ex) {

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ResponseBuilder.error(
                        "Operation cannot be completed because the resource is referenced by other records."
                ));
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(
            IllegalArgumentException ex) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseBuilder.error(ex.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
public ResponseEntity<ApiResponse<Void>> handleBadCredentialsException(
        BadCredentialsException ex) {

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(ResponseBuilder.error("Invalid email or password."));
}

@ExceptionHandler(DisabledException.class)
public ResponseEntity<ApiResponse<Void>> handleDisabledException(
        DisabledException ex) {

    return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(ResponseBuilder.error(
                    "Your email is not verified. Please verify your email before logging in."
            ));
}

@ExceptionHandler(LockedException.class)
public ResponseEntity<ApiResponse<Void>> handleLockedException(
        LockedException ex) {

    return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(ResponseBuilder.error("Your account is locked."));
}
}