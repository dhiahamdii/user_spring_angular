package com.supportportal.service;

 import com.supportportal.domain.Loi;

import java.util.List;

public interface ILoiService {

    List<Loi> getLastAddedDocumentation();
    Loi getLoi(Long id);
    List<Loi> getLoidoc(Long id);

        List<Loi> getAllLois();

    void deleteLoi(Long id);

    void updateLoi(Loi Loi,Long id);

}

