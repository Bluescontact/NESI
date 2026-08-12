---
name: infrastructure
description: >-
  Monitor and maintain Kevin's physical infrastructure — solar power system
  (2.6kW / 15kWh / 10kW inverter / six 440W panels), aquaponics system,
  and off-grid operations in New Mexico. Reads sensor data from
  tools/recognition/infrastructure.json, maintains maintenance log, applies
  seasonal awareness (NM high desert climate). Triggers: "system status",
  "solar report", "aquaponics check", "battery level", "maintenance due",
  "log maintenance", "what needs attention", "seasonal adjustments".
  HARD LIMIT: never autonomously actuates physical equipment. Monitor and
  recommend only — Kevin decides all physical actions.
---

# Infrastructure Bridge

Monitoring and maintenance tracking for Kevin's off-grid physical systems.
Reads sensor data, tracks equipment state, applies New Mexico seasonal
awareness, maintains a maintenance log. The agent monitors and recommends.
Kevin decides all physical actions. Equipment actuation is never automated.

## State File

`C:\Users\KMEAR\OneDrive\Desktop\DSS content\tools\recognition\infrastructure.json`

Structure:
```json
{
  "last_updated": "YYYY-MM-DD",
  "location": {
    "state": "New Mexico",
    "elevation": "high desert",
    "climate_zone": "4B semi-arid"
  },
  "solar": {
    "panels": 6,
    "panel_wattage": 440,
    "system_wattage": 2640,
    "battery_kwh": 15,
    "inverter_kw": 10,
    "last_reading": null,
    "battery_pct": null,
    "daily_yield_kwh": null,
    "notes": ""
  },
  "aquaponics": {
    "fish_tank_ph": null,
    "fish_tank_temp_f": null,
    "growbed_ph": null,
    "ambient_temp_f": null,
    "water_level": null,
    "pump_running": null,
    "last_reading": null,
    "notes": ""
  },
  "maintenance_log": []
}
```

If the file does not exist, initialize with the above structure and null readings.
When Kevin provides readings, update the relevant fields and `last_updated`.

## Solar System Specs

- **Panels**: 6 × 440W = 2,640W peak
- **Battery**: 15kWh
- **Inverter**: 10kW
- **Baseline load**: ~2.4kW (bus: solar + Starlink + ~$1,500/mo operations)

At peak production (summer NM): expect 4-6h of near-full output = ~10-15kWh/day
At minimum (winter, cloudy): expect 1-2h = ~2-5kWh/day
Battery at 15kWh provides: ~6h at full 2.4kW baseline load

**Alert thresholds**:
- Battery < 30% (4.5kWh) → Note: monitor charging rate
- Battery < 15% (2.25kWh) → Alert: reduce non-essential load
- Battery < 5% (0.75kWh) → Urgent: non-essential load off immediately
- Daily yield < 2kWh → Note: possible panel obstruction or heavy cloud

## Aquaponics Parameters (New Mexico conditions)

**Fish tank**:
- pH target: 6.8–7.2 · alert below 6.0 or above 8.0
- Temperature: 65–78°F optimal · alert below 60°F or above 85°F

**Grow beds**:
- pH target: 5.8–6.2 for most crops

**Seasonal adjustments (NM)**:
- Winter (Nov–Feb): water temp may need supplemental heating below 60°F
- Spring/Monsoon (Jul–Sep): humidity up, watch for fungal pressure
- Summer (Jun–Aug): evaporation high, check water level daily
- Planting windows: warm-season crops May–Aug, cool-season Sep–Nov and Mar–Apr

## Alert Levels

| Level | Meaning | Action |
|---|---|---|
| Note | Approaching threshold or trending | Include in next report |
| Alert | Threshold exceeded | Surface immediately in response |
| Urgent | Critical — fish/system at risk | Surface immediately, all caps |

## Commands

When invoked:

### "System status"

Read infrastructure.json. Report:
- Solar: battery %, daily yield if known, any alerts
- Aquaponics: pH and temp if known, any alerts
- Last updated date
- Items at Alert or Urgent level (none if all clear)

If last_updated is more than 48h ago, note that readings may be stale.

### "Solar report"

Read infrastructure.json solar section. Report:
- Battery %, estimated runtime at baseline load
- Daily yield vs. expected for current season
- Panel count and system capacity
- Any maintenance items due

### "Aquaponics check"

Read infrastructure.json aquaponics section. Report:
- Current pH and temperature readings
- Status vs. target ranges
- Seasonal context (current NM season)
- Any items at alert level

### "Battery level"

Read infrastructure.json. Report battery % and:
- Estimated hours at 2.4kW baseline load
- Alert level if below threshold
- Recent trend if multiple readings exist in notes

### "What needs attention"

Read infrastructure.json. Return all items above Level 1 (Note or higher).
If maintenance_log has items with next_scheduled in the past or within 7 days,
surface those too.

### "Log maintenance: [equipment] [action] [notes]"

Append to maintenance_log array:
```json
{
  "date": "YYYY-MM-DD",
  "equipment": "...",
  "action": "...",
  "performed_by": "Kevin",
  "notes": "...",
  "next_scheduled": null
}
```

Ask if there is a next scheduled date. Write updated infrastructure.json.

### "Update reading: [field] [value]"

Update the named field in infrastructure.json. Set last_updated to today.
Apply alert logic: if new value crosses a threshold, surface the alert.

### "Maintenance schedule"

Read maintenance_log. Return items where next_scheduled is not null,
sorted by next_scheduled date. Flag overdue items (next_scheduled in past).

### "Seasonal adjustments"

Determine current NM season based on today's date. Return:
- Relevant threshold adjustments for current season
- What to watch for in coming weeks
- Any upcoming planting/harvest windows

## Physical Equipment Actuation — Hard Limit

The infrastructure skill monitors, logs, and recommends. It never:
- Turns pumps on or off
- Adjusts valves
- Changes electrical configuration
- Sends alerts to external systems without Kevin's instruction

Every physical action recommendation ends with: "Kevin decides."
The skill is the monitoring layer. The human is the actuation layer.
This is not a safety rule — it is the structural design.

## Failure Modes

**Stale readings**: The infrastructure.json state is only as current as the
last manual update. If Kevin has not updated readings, the skill reports from
potentially stale data. Always surface the last_updated date so Kevin can
judge freshness.

**Threshold rigidity**: NM climate is variable. The fixed thresholds are
baselines. Kevin's on-the-ground read of conditions always overrides the
threshold logic. The skill provides the threshold; Kevin reads the actual
situation.

**Alert fatigue**: Surfacing every Note-level item degrades the signal.
Reserve active surfacing for Alert and Urgent. Note-level items appear in
routine reports but not in ambient responses.

## Files

| Path | Role |
|---|---|
| `tools/recognition/infrastructure.json` | Live state — read/write on updates |

Base directory: `C:\Users\KMEAR\OneDrive\Desktop\DSS content`

---

*The agent monitors; Kevin decides. A pump that doesn't turn on kills fish.
The graduated trust model is not optional for infrastructure — it is the
structure. Tier 3 is not sufficient for physical actuation without Kevin's
explicit instruction at that moment.*
