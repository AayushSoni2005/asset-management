package com.aayush.assetmanagement.issue.service;

import com.aayush.assetmanagement.issue.dto.IssueRequest;
import com.aayush.assetmanagement.issue.dto.IssueResponse;

import java.util.List;

public interface IssueService {

    IssueResponse createIssue(IssueRequest request);

    IssueResponse getIssueById(Long id);

    List<IssueResponse> getAllIssues();

    IssueResponse updateIssue(Long id, IssueRequest request);

    void deleteIssue(Long id);

}