import {DEFAULT_LANES} from './lanes';

export function transformTicketToLanes (tickets) {
    const TICKET_DETAIL_PATH = 'https://911.lazada.com/helpdesk/tickets/';
    
    var result = DEFAULT_LANES;
    var activeLaneIndex;

    tickets.forEach(function(ticket) {
        var tempCard = {};

        tempCard.id = ticket.display_id.toString();
        tempCard.subject = ticket.subject;
        tempCard.assignee = ticket.responder_name;
        tempCard.status = ticket.status_name;
        tempCard.priority = ticket.priority_name;
        tempCard.portal_url = TICKET_DETAIL_PATH + tempCard.id;
        tempCard.jira_url = ticket.custom_field.jira_ticket_url_23497;
        tempCard.created_at = ticket.created_at;
        tempCard.updated_at = ticket.updated_at;

        activeLaneIndex = result.lanes.findIndex(lane => lane.title === tempCard.status);

        console.log(tempCard);
        console.log(activeLaneIndex);
        console.log(result.lanes[activeLaneIndex]);
        console.log("--------------");

        if(activeLaneIndex === -1){
            alert("Cannot find lane for card with status: " + tempCard.id);
        } else {
            result.lanes[activeLaneIndex].cards.push(tempCard);
        }
    });
    return result;
}