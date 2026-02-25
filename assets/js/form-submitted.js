/**
 * Form-submitted page: parse Tally redirect URL params, show/hide "Add to calendar"
 * button, and generate .ics download for the booking event.
 */
(function () {
    'use strict';

    var CHADUNA_MAPS_URL = 'https://maps.app.goo.gl/5YQLk8tGwwkAUZMQ8';
    var DESCRIPTION_FOOTER = 'Thank you for reserving a table at Chaduna. We will contact you to confirm. If you need to cancel, call or text us – our contacts are available on https://chaduna.com website. See you soon!';

    function getParams() {
        var search = typeof window.location.search !== 'undefined' ? window.location.search : '';
        if (!search || search.charAt(0) !== '?') return {};
        var params = {};
        search.slice(1).split('&').forEach(function (pair) {
            var i = pair.indexOf('=');
            if (i === -1) return;
            var key = decodeURIComponent(pair.slice(0, i).replace(/\+/g, ' '));
            var value = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
            params[key] = value;
        });
        return params;
    }

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function icsDateLocal(year, month, day, hour, minute) {
        return '' + year + pad2(month) + pad2(day) + 'T' + pad2(hour) + pad2(minute) + '00';
    }

    function escapeIcsText(s) {
        return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
    }

    function buildIcs(params) {
        var name = params.name || 'Guest';
        var guestNum = parseInt(params.guest, 10);
        if (isNaN(guestNum) || guestNum < 1) guestNum = 1;
        var guestLabel = guestNum === 1 ? '1 guest' : guestNum + ' guests';
        var summary = 'Table at Chaduna – ' + name + ', ' + guestLabel;

        var dateStr = (params.date || '').trim();
        var timeStr = (params.time || '').trim().replace(/%3A/gi, ':');
        var dateParts = dateStr.split('-');
        var timeParts = timeStr.split(':');
        if (dateParts.length !== 3 || timeParts.length < 2) return null;

        var year = parseInt(dateParts[0], 10);
        var month = parseInt(dateParts[1], 10);
        var day = parseInt(dateParts[2], 10);
        var hour = parseInt(timeParts[0], 10);
        var minute = parseInt(timeParts[1], 10) || 0;
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour)) return null;

        var startStr = icsDateLocal(year, month, day, hour, minute);
        var startDate = new Date(year, month - 1, day, hour, minute, 0);
        var endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        var endStr = icsDateLocal(
            endDate.getFullYear(),
            endDate.getMonth() + 1,
            endDate.getDate(),
            endDate.getHours(),
            endDate.getMinutes()
        );

        var descParts = [];
        if (params.notes && params.notes.trim()) {
            descParts.push('Special requests: ' + params.notes.trim());
            descParts.push('');
        }
        descParts.push(DESCRIPTION_FOOTER);
        var description = descParts.join('\n');

        var uid = 'chaduna-booking-' + dateStr + '-' + timeStr.replace(':', '') + '@chaduna.com';
        var lines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Chaduna//Booking//EN',
            'BEGIN:VEVENT',
            'UID:' + uid,
            'DTSTART:' + startStr,
            'DTEND:' + endStr,
            'SUMMARY:' + escapeIcsText(summary),
            'LOCATION:' + escapeIcsText(CHADUNA_MAPS_URL),
            'DESCRIPTION:' + escapeIcsText(description),
            'END:VEVENT',
            'END:VCALENDAR'
        ];
        return lines.join('\r\n');
    }

    function downloadIcs(icsContent, filename) {
        var blob = new Blob([icsContent], { type: 'text/calendar; charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function init() {
        var btn = document.getElementById('add-to-calendar-btn');
        if (!btn) return;

        var params = getParams();
        var date = (params.date || '').trim();
        var time = (params.time || '').trim();

        if (!date || !time) {
            btn.style.display = 'none';
            var wrap = btn.closest('.add-to-calendar-wrap');
            if (wrap) wrap.style.display = 'none';
            return;
        }

        btn.addEventListener('click', function () {
            var ics = buildIcs(params);
            if (!ics) return;
            var filename = 'chaduna-booking-' + (params.date || 'event') + '.ics';
            downloadIcs(ics, filename);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
