# NetBox Change Management

This plugin adds change management support to [NetBox](http://netboxlabs.com/oss/netbox/). Leveraging the [netbox-branching](https://github.com/netboxlabs/netbox-branching) plugin, it implements policy and workflow controls to ensure proposed changes undergo formal review prior to being merged. It also retains a written record of all approved changes.

## Getting Started

### Defining a Policy

Change policies determine who is eligible to approve a change request and how many approvals a change request requires. Each policy contains one or more rules which define these parameters.

Begin by creating a new policy with a name of your choosing, then add however many rules are necessary to enforce your organization's change policy.

For example, suppose your team requires that every change be approved by two engineers (members of the Engineering group in NetBox) and one of the two lead engineers (Alice and Bob). This can be achieved by adding two rules to the policy.

| Rule | Minimum reviews | Reviewer groups | Reviewers  |
|------|-----------------|-----------------|------------|
| #1   | 2               | Engineering     | -          |
| #2   | 1               | -               | Alice, Bob |

This policy will be met only when at least two members of the Engineering group _and_ Alice or Bob submit approvals.

### Create a Change Request

When you've finished staging your changes in a branch, click the "request review" button at the top of the branch view. This will take you to the change request creation form.

Enter a name for your change request (or keep the default value, taken from the branch's name) and select the change policy which applies to your request. Each change request will be opened in "draft" status with medium priority by default, but these can be changed. Go ahead and change the status to "needs review" if it's ready for review now. Finally, provide a brief summary of your changes for reviewers.

### Reviewing a Change Request

Once a change request has been submitted, it can be reviewed by other users. To review a change request, click the "add a review" link above the list of reviews (if any). Select the status of your review and provide any comments you have. Your review will now show up under the change request.

Alternatively, if you'd like to provide more detailed feedback, select the "changes" tab. Here, you can comment on specific changes within the branch and cite any concerns or suggestions you have. Other users can then reply to your comments.

### Applying a Change Request

Once a change request has been approved, the "merge" button will appear. Clicking it will take you to the form to merge the corresponding branch.

Once the branch has been merged successfully, the change request's status will be automatically updated to "completed."
