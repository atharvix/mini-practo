package com.hms.backend.util;

import java.util.Random;

public class UidGenerator {

    private static final Random random = new Random();

    // Private constructor to prevent instantiation
    private UidGenerator() {
    }

    public static String generate(String prefix) {
        int number = 1000 + random.nextInt(9000); // 1000–9999
        return prefix + number;
    }
}
