import {expect} from "chai";
import {shallowMount} from '@vue/test-utils'
import Environment from "@/components/Environment";

describe('Environment', () => {
    it('does not have data if the environment has not been loaded', () => {
        const wrapper = shallowMount(Environment, {
            propsData: {
                environment: {}
            }
        });

        expect(wrapper.vm.disabled).to.be.false;
        expect(wrapper.vm.loading).to.be.false;
        expect(wrapper.vm.environmentRef).to.be.null;
        expect(wrapper.vm.deployableStatus).to.be.null;
        expect(wrapper.vm.userAvatarUrl).to.be.null;
        expect(wrapper.vm.deployableFinishedAt).to.be.null;
        expect(wrapper.vm.branchName).to.be.empty;
        expect(wrapper.vm.environmentStatus).to.be.empty;
        expect(wrapper.vm.triggererIcon).to.be.empty;
        expect(wrapper.vm.deployedAt).to.be.empty;
    });
});
