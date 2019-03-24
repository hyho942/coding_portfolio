/*
 * 비상시 ajax 로딩 및 기타 로직관련된 처리를 막도록 처리해주는 Flag
 */

var emergencyItemDtlFlag = false;

// 비상시 히스토리 데이터 처리를 하지 않도록 ==> history.js로 이동
//var emergencyDisablingHistoryForPC = false;
//var emergencyDisablingHistoryForMO = false;

// 비상시 장바구니 담는 경우 체크를 위한 플래그
var emergencyCartItemForMO = false;

// 비상시 채널팝업 로직을 막기위한 위한 플래그
var emergencyDisablingChnlPopupForPC = false;
var emergencyDisablingChnlPopupForMO = false;

var emergencyItemIds = "";