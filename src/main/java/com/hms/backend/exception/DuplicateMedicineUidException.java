package com.hms.backend.exception;

public class DuplicateMedicineUidException extends RuntimeException {
    public DuplicateMedicineUidException(String message) {
        super(message);
    }
}
