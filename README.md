# Call of Duty Armory

This is repository for [codarmory.com](https://codarmory.com).

Tech stack:

- TypeScript;
- [VueJS 3](https://vuejs.org) Composition API;
- [Pinia](https://pinia.vuejs.org);
- [TailwindCSS](https://tailwindcss.com) (with [TailwindUI](https://tailwindui.com) Components);
- [HeadlessUI](https://headlessui.com);
- [ViteJS](https://vitejs.dev).

## Running Locally

- `npm install`
- `npm run dev`

## Reporting Errors

I tried my best to eliminate most of the errors (i.e. unlock requirements for attachments), but you might still
find some invalid unlock descriptions. If you want to fix it, please, DO NOT edit JSON files manually!

`attachment-categories.json`, `attachment-stats.json`, `attachments.json`, `categories.json`, `platforms.json`
and `weapons.json` are auto-generated from my backend app that I use as an editor
(it looks like [this](https://i.imgur.com/m3MmQSX.png) or [that](https://i.imgur.com/t6BxaXM.png)).

Instead, please use [issues tracker](https://github.com/tzurbaev/codarmory.com/issues) to report such errors.
I will re-check your info, edit database files and release new version with credits to you in
[changelog](https://codarmory.com/changelog).

## Duplicate Attachments

There are several attachments with the same name (or even same description and same pros/cons) but with different unlock
descriptions, for example:

- 7.62 Armor Piercing Ammunition (one unlocks at RPK level 5, the other at Rapp-H level 17);
- 7.62 Frangible Ammunition (one unlocks at Kastov 762 level 18, the other at SP-R 208 level 7);
- Bruen G305 Grip Wrap (one of the leaders here: it unlocks by four different weapons);
- Bruen Q900 Grip Wrap (unlocks by two different weapons).

I don't know why IW decided to create duplicate attachments (or at least attachments with the same name)
for different weapons, but that's it. In some updates they make changes to them. For example, in Season 02 update
they renamed Bruen Warrior Grip (for Sakin MG38) to Bruen Warrior LMG (there's another Bruen Warrior Grip with different
description/stats unlockable by Vel 46).

For now, I don't consider them errors, so they will stay in DB until IW fixes them.

## Security

If you discover any security related issues, please email me to [hello@zurbaev.com](mailto:hello@zurbaev.com) instead of using the issue tracker.

# License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
