#!/bin/env bash

orig_gid_file="/etc/subgid"
orig_uid_file="/etc/subuid"
bkp_gid_file="/tmp/subgid_bkp"
bkp_uid_file="/tmp/subuid_bkp"
non_root_user="${1:-student}"

migrate_ids() {
    su - "${non_root_user}" sh -c "podman system migrate"
}

backup_ids() {
    echo "Backing up ${orig_gid_file} and ${orig_uid_file}"
    mv "${orig_gid_file}" "${bkp_gid_file}" && \
    mv "${orig_uid_file}" "${bkp_uid_file}" && \
    migrate_ids
}

restore_ids() {
    echo "Restoring ${orig_gid_file} and ${orig_uid_file}"
    mv "${bkp_gid_file}" "${orig_gid_file}" && \
    mv "${bkp_uid_file}" "${orig_uid_file}" && \
    migrate_ids
}

main() {
    if [[ "$EUID" -ne 0 ]]; then
        echo "This script requires root privileges"
        exit -2
    fi

    if [[ -f "${bkp_gid_file}" ]] && [[ -f "${bkp_uid_file}" ]]; then
        # Backup ID files, restore them
        restore_ids && echo "OK" || echo "Something went wrong, verify files manually"
    elif [[ -f "${orig_gid_file}" ]] && [[ -f "${orig_uid_file}" ]]; then
        # Original ID files exist, back them up
        backup_ids && echo "OK" || echo "Something went wrong, verify files manually"
    else
        # Something went wrong, exit
        echo "Cannot back up or restore ID files, exiting"
        exit -1
    fi

}

main
