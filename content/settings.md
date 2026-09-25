---
# ─────────────────────────────────────────────────────────────
#  SITE SETTINGS 网站设置
#  One setting per line:   name: value
#  A setting ending in _zh is the Chinese version of the one above it.
#  Lines starting with # are notes for you — the website ignores them.
# ─────────────────────────────────────────────────────────────

name: Sydney Anglicans Chinese Ministry
name_zh: 悉尼圣公会华文事工
short_name: SYDACM
tagline: We long to help you find a spiritual home
tagline_zh: 我们渴望帮你找到属灵的家

# ── Contact details (shown on the Contact page and in the footer)
contact_person: Rev David Yung
contact_person_zh: 翁沛偉牧師
address: 57 Princes Highway, Kogarah NSW 2217
email: david@yungs.au
phone: 0414 628 775

# Optional — leave blank to hide
wechat:
facebook:
youtube:

# ── Menu: the pages in the top menu, in order.
# Each name must match a file in content/pages/ (without .md).
menu: home, about, churches, archbishop, events, resources, contact

# ── Language shown to first-time visitors: zh or en
default_language: zh

# ── Contact form. Leave blank to show an "Email us" button instead.
# To switch the form on, see README.md → "Turning on the contact form".
formspree:

# ── Where the church list comes from.
# The list is edited in the sydacm-churches repository, not here.
churches_data: https://sydacm.github.io/sydacm-churches/churches.geojson
churches_site: https://sydacm.github.io/sydacm-churches/
churches_update_form: https://github.com/sydacm/sydacm-churches/issues/new?template=update-listing.yml
# Where "Update this listing" emails from churches go. Leave blank to use the email above.
churches_update_email:

# ── This website's own GitHub repository (used for the "Site admin" link)
repo: sydacm/sydacm.github.io
---
