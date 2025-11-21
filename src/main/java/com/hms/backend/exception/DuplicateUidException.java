package com.hms.backend.exception;

public class DuplicateUidException extends RuntimeException {
    public DuplicateUidException(String message) {
        super(message);
    }
}
