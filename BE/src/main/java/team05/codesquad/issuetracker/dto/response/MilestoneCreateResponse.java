package team05.codesquad.issuetracker.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class MilestoneCreateResponse {

    private final Long milestoneId;

    public MilestoneCreateResponse(Long milestoneId) {
        this.milestoneId = milestoneId;
    }
}