package by.bsuir.service.impl;

import java.util.Objects;

final class ServiceHelper {
    private ServiceHelper() {

    }


    static boolean isSortTypeCorrect(final String sortType) {
        return Objects.nonNull(sortType) &&
                (sortType.equalsIgnoreCase("ASC") ||
                        sortType.equalsIgnoreCase("DESC"));
    }


}
